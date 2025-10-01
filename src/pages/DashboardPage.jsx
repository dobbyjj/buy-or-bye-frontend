import React, { useState, useEffect } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import BottomNavbar from '../components/common/BottomNavbar';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { db } from '../db.js';
import { averageMonthlySalary } from '../data/averageSalaryData';
import { averageMonthlyConsumption } from '../data/averageConsumptionData';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ChartDataLabels);

const getAgeGroup = (age) => {
    if (age <= 19) return '19세이하';
    if (age >= 20 && age <= 24) return '20-24세';
    if (age >= 25 && age <= 29) return '25-29세';
    if (age >= 30 && age <= 34) return '30-34세';
    if (age >= 35 && age <= 39) return '35-39세';
    if (age >= 40 && age <= 44) return '40-44세';
    if (age >= 45 && age <= 49) return '45-49세';
    return null;
};

const getAgeDecade = (age) => {
    if (age < 20) return '20대'; // 20대 미만은 20대 데이터 사용
    if (age >= 20 && age < 30) return '20대';
    if (age >= 30 && age < 40) return '30대';
    if (age >= 40 && age < 50) return '40대';
    if (age >= 50 && age < 60) return '50대';
    if (age >= 60) return '60대 이상';
    return '20대'; // 기본값
};


const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('asset');
    const [startYear, setStartYear] = useState(2023);
    const [endYear, setEndYear] = useState(2024);

    const summary = {
        currentAsset: 12500000,
        monthlyIncome: 1200000,
        monthlyExpense: 829000,
    };

    const [assetChartData, setAssetChartData] = useState({
        ratio: { labels: ['부동산', '대출', '예금/현금', '기타 자산'], datasets: [{ data: [5000000, 2000000, 3500000, 2000000], backgroundColor: ['#EF4444', '#F59E0B', '#14B8A6', '#3B82F6'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '자산', data: [1250, 0, 1500], backgroundColor: '#3B82F6' }] },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 자산', data: [1000, 1050, 1150, 1180, 1200, 1160, 1100, 1180, 1250, 1280, 1300, 1350], borderColor: '#10B981', tension: 0.3, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.2)' }] },
    });
    const [expenseChartData, setExpenseChartData] = useState({
        monthly: { labels: ['식비', '쇼핑', '교통', '주거/관리', '문화/여가', '화장품', '기타'], datasets: [{ data: [350000, 100000, 150000, 200000, 129000, 80000, 90000], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '지출', data: [82.9, 0, 65], backgroundColor: '#FF6384' }] },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 지출', data: [75, 72, 80, 85, 78, 82, 90, 88, 82.9, 79, 70, 65], borderColor: '#EF4444', tension: 0.3, fill: false }] },
    });
    const [incomeChartData, setIncomeChartData] = useState({
        monthly: { labels: ['월급', '투자', '용돈', '기타'], datasets: [{ data: [1000000, 100000, 50000, 50000], backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24', '#8B5CF6'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '수입', data: [120, 0, 150], backgroundColor: '#22C55E' }] },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 수입', data: [110, 118, 125, 122, 120, 128, 130, 126, 120, 132, 140, 145], borderColor: '#22C55E', tension: 0.3, fill: false }] },
    });
    
    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                // 👇 사용자 정보가 없으면 기본 나이(25세)를 사용하도록 수정
                let userAge = 25; 
                const userDataString = localStorage.getItem('userData');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    if (userData && userData.age) {
                        userAge = parseInt(userData.age, 10);
                    }
                }

                // --- 수입 평균 계산 ---
                const salaryAgeGroup = getAgeGroup(userAge);
                const salaryData = averageMonthlySalary.find(d => d.ageGroup === salaryAgeGroup);
                const avgIncomeInTenThousand = salaryData ? salaryData.monthlySalary / 10000 : 0;
                
                // --- 지출 평균 계산 ---
                const consumptionAgeGroup = getAgeDecade(userAge);
                const consumptionData = averageMonthlyConsumption.find(d => d.ageGroup === consumptionAgeGroup);
                const avgExpenseInTenThousand = consumptionData ? consumptionData.onePerson / 10000 : 0;

                // --- 자산 평균 계산 ---
                const ageGroupForDexie = getAgeGroup(userAge)?.replace('세이하', '').replace('세','');
                const averageData = await db.averages.where('age_group').equals(ageGroupForDexie).first();
                const avgAssetInTenThousand = averageData ? averageData.avg_asset : 0;
                
                // --- 모든 차트 데이터 업데이트 ---
                setIncomeChartData(prev => ({
                    ...prev,
                    comparison: { ...prev.comparison, datasets: [{ ...prev.comparison.datasets[0], data: [summary.monthlyIncome / 10000, avgIncomeInTenThousand, 150] }] }
                }));

                setExpenseChartData(prev => ({
                    ...prev,
                    comparison: { ...prev.comparison, datasets: [{ ...prev.comparison.datasets[0], data: [summary.monthlyExpense / 10000, avgExpenseInTenThousand, 65] }] }
                }));
                
                setAssetChartData(prev => ({
                    ...prev,
                    comparison: { ...prev.comparison, datasets: [{ ...prev.comparison.datasets[0], data: [summary.currentAsset / 10000, avgAssetInTenThousand, 1500] }] }
                }));

            } catch (error) {
                console.error("평균 데이터 로드 및 차트 업데이트 중 에러 발생:", error);
            }
        };

        fetchAndSetData();
    }, []);

    const handleStartYearChange = (e) => {
        const newStartYear = parseInt(e.target.value);
        setStartYear(newStartYear);
        if (newStartYear > endYear) {
            setEndYear(newStartYear);
        }
    };

    const handleEndYearChange = (e) => {
        const newEndYear = parseInt(e.target.value);
        setEndYear(newEndYear);
        if (newEndYear < startYear) {
            setStartYear(newEndYear);
        }
    };

    const tabConfig = {
        asset: {
            title: '총 자산 현황',
            chart1: { type: Doughnut, title: '전체 자산 비율', source: assetChartData.ratio },
            chart2: { type: Bar, title: '동 연령 평균 및 재무 목표 비교', source: assetChartData.comparison },
            chart3: { type: Line, title: '1년 자산 추이', source: assetChartData.yearly }
        },
        expense: {
            title: '총 지출 현황',
            chart1: { type: Doughnut, title: '월별 지출 비율', source: expenseChartData.monthly },
            chart2: { type: Bar, title: '동 연령 평균 및 재무 목표 비교', source: expenseChartData.comparison },
            chart3: { type: Line, title: '1년 지출 추이', source: expenseChartData.yearly }
        },
        income: {
            title: '총 수입 현황',
            chart1: { type: Doughnut, title: '월별 수입 비율', source: incomeChartData.monthly },
            chart2: { type: Bar, title: '동 연령 평균 및 재무 목표 비교', source: incomeChartData.comparison },
            chart3: { type: Line, title: '1년 수입 추이', source: incomeChartData.yearly }
        },
    };

    const currentConfig = tabConfig[activeTab];

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false, // 👈 차트가 꽉 차도록 설정
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        label += (context.parsed.y || context.parsed).toLocaleString('ko-KR') + '만';
                        return label;
                    }
                }
            },
            datalabels: { display: false }
        },
        scales: {
            y: { beginAtZero: true, display: true, ticks: { callback: (value) => value + '만' } },
            x: { display: true }
        },
    };
    
    // 👇 도넛 차트의 데이터 단위가 '원' 단위로 제대로 표시되도록 수정
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.label || '';
                        if (label) label += ': ';
                        label += context.parsed.toLocaleString('ko-KR') + '원';
                        return label;
                    }
                }
            },
            datalabels: {
                color: '#fff',
                textAlign: 'center',
                font: { weight: 'bold', size: 10 },
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n${percentage}`;
                },
                anchor: 'center',
                align: 'center',
                offset: 0,
            },
        },
    };

    const handleAnalysisEdit = () => {
        window.location.href = "/analysis?page=3";
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f9f9f9", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 80 }}>
            <div style={{ width: "100%", maxWidth: 768, margin: "0 auto", padding: "24px 8px" }}>
                <h1 style={{ textAlign: "center", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, color: "#222", marginBottom: 24 }}>결과 대시보드</h1>
                <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: "40px 20px", marginBottom: 24, minHeight: "120px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 20, gap: "4px" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#666", marginRight: "4px" }}>Period:</span>
                        <select value={startYear} onChange={handleStartYearChange} style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", fontWeight: "500", color: "#333", background: "#fff", marginRight: "2px" }}>
                            {Array.from({ length: 10 }, (_, i) => 2020 + i).map(year => (<option key={year} value={year}>{year}</option>))}
                        </select>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#666", margin: "0 2px" }}>-</span>
                        <select value={endYear} onChange={handleEndYearChange} style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "14px", fontWeight: "500", color: "#333", background: "#fff", marginLeft: "2px", marginRight: "4px" }}>
                            {Array.from({ length: 10 }, (_, i) => 2020 + i).map(year => (<option key={year} value={year}>{year}</option>))}
                        </select>
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 600, color: "#666", marginBottom: 20, textAlign: "left", marginLeft: "0px" }}>이번 달 자산, 지출, 수입 요약</p>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                        <span style={{ color: "#10B981", flex: "1", textAlign: "left", minWidth: "120px" }}>자산: {summary.currentAsset.toLocaleString('ko-KR')}원</span>
                        <span style={{ color: "#EF4444", flex: "1", textAlign: "center", minWidth: "120px" }}>지출: {summary.monthlyExpense.toLocaleString('ko-KR')}원</span>
                        <span style={{ color: "#3B82F6", flex: "1", textAlign: "right", minWidth: "120px" }}>수입: {summary.monthlyIncome.toLocaleString('ko-KR')}원</span>
                    </div>
                </div>
                <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: 24 }}>
                    {['asset', 'expense', 'income'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "12px 0", fontWeight: 600, fontSize: 16, color: activeTab === tab ? "#4B4BFF" : "#888", borderBottom: activeTab === tab ? "2px solid #4B4BFF" : "none", background: "none", border: "none", cursor: "pointer" }}>
                            {tab === 'asset' ? '자산' : tab === 'expense' ? '지출' : '수입'}
                        </button>
                    ))}
                </div>
                <section style={{ marginBottom: 40 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 18 }}>{currentConfig.title}</h2>
                    <ChartBlock config={currentConfig.chart1} options={doughnutOptions} isDoughnut={true} onEdit={handleAnalysisEdit} />
                    <ChartBlock config={currentConfig.chart2} options={commonOptions} wide={true} />
                    <ChartBlock config={currentConfig.chart3} options={commonOptions} wide={true} />
                </section>
            </div>
            <BottomNavbar active="dashboard" />
        </div>
    );
};

export default DashboardPage;

const ChartBlock = ({ config, options, isDoughnut = false, onEdit, wide = false }) => {
    const ChartComponent = config.type;

    const renderDoughnutLegend = () => {
        if (!config.source.datasets || config.source.datasets.length === 0) {
            return null;
        }
        const data = config.source.datasets[0].data;
        const labels = config.source.labels;
        const colors = config.source.datasets[0].backgroundColor;
        const total = data.reduce((a, b) => a + b, 0);

        return (
            <div style={{ flex: 1, paddingLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '16px', color: '#666' }}>자산 총액</span>
                    <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: '4px 0' }}>
                        {(total / 10000).toLocaleString('ko-KR')} 만원
                    </h4>
                </div>
                <div>
                    {labels.map((label, index) => {
                        const value = data[index];
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
                        return (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors[index], marginRight: '8px' }}></span>
                                    <span style={{ fontSize: '14px', color: '#555' }}>{label}</span>
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                                    {(value / 10000).toLocaleString('ko-KR')} ({percentage}%)
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: "24px 16px", marginBottom: 24, border: "1px solid #eee" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#444" }}>{config.title}</h3>
                {isDoughnut && (<button onClick={onEdit} style={{ background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "4px 14px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>편집</button>)}
            </div>
            {isDoughnut ? (
                <div style={{ display: 'flex', alignItems: 'center', position: "relative", height: "300px" }}>
                    <div style={{ flex: 0.2, position: 'relative', height: '100%' }}>
                        <ChartComponent data={config.source} options={options} />
                    </div>
                    {renderDoughnutLegend()}
                </div>
            ) : (
                <div style={{ position: "relative", height: "220px" }}>
                    <ChartComponent data={config.source} options={options} />
                </div>
            )}
        </div>
    );
};