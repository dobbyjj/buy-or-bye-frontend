import React, { useState, useEffect } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import BottomNavbar from '../components/common/BottomNavbar';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { db } from '../db.js';
// 👈 1. 평균 월급 데이터를 가져옵니다.
import { averageMonthlySalary } from '../data/averageSalaryData';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ChartDataLabels);

// 👈 2. getAgeGroup 함수를 새로운 데이터 형식에 맞게 확장합니다.
const getAgeGroup = (age) => {
    if (age <= 19) return '19세이하';
    if (age >= 20 && age <= 24) return '20-24세';
    if (age >= 25 && age <= 29) return '25-29세';
    if (age >= 30 && age <= 34) return '30-34세';
    if (age >= 35 && age <= 39) return '35-39세';
    if (age >= 40 && age <= 44) return '40-44세';
    if (age >= 45 && age <= 49) return '45-49세';
    // 필요에 따라 이미지의 나머지 연령대도 추가할 수 있습니다.
    return null;
};

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('asset');
    const [startYear, setStartYear] = useState(2023);
    const [endYear, setEndYear] = useState(2024);

    // 사용자의 실제 데이터 (예시)
    const summary = {
        currentAsset: 12500000,
        monthlyIncome: 1200000,
        monthlyExpense: 829000,
    };

    // 차트 데이터 초기 상태
    const [assetChartData, setAssetChartData] = useState({
        ratio: { labels: ['부동산', '대출', '예금/현금', '기타 자산'], datasets: [{ data: [500, 200, 350, 200], backgroundColor: ['#EF4444', '#F59E0B', '#14B8A6', '#3B82F6'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '자산', data: [1250, 0, 1500], backgroundColor: '#3B82F6' }] },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 자산', data: [1000, 1050, 1150, 1180, 1200, 1160, 1100, 1180, 1250, 1280, 1300, 1350], borderColor: '#10B981', tension: 0.3, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.2)' }] },
    });
    const [expenseChartData, setExpenseChartData] = useState({
        monthly: { labels: ['식비', '쇼핑', '교통', '주거/관리', '문화/여가', '화장품', '기타'], datasets: [{ data: [350, 100, 150, 200, 129, 80, 90], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '지출', data: [829, 0, 650], backgroundColor: '#FF6384' }] },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 지출', data: [750, 720, 800, 850, 780, 820, 900, 880, 829, 790, 700, 650], borderColor: '#EF4444', tension: 0.3, fill: false }] },
    });
    const [incomeChartData, setIncomeChartData] = useState({
        monthly: { labels: ['월급', '투자(부동산, 금융 등)', '용돈', '기타 부수입'], datasets: [{ data: [1000, 100, 50, 50], backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24', '#8B5CF6'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '수입', data: [1200, 0, 1500], backgroundColor: '#22C55E' }] },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 수입', data: [1100, 1180, 1250, 1220, 1200, 1280, 1300, 1260, 1200, 1320, 1400, 1450], borderColor: '#22C55E', tension: 0.3, fill: false }] },
    });
    
    // 👈 3. 기존의 useEffect 두 개를 아래의 하나로 통합하고 수정합니다.
    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                // localStorage에서 사용자 데이터 가져오기
                const userDataString = localStorage.getItem('userData');
                if (!userDataString) return;

                const userData = JSON.parse(userDataString);
                const userAge = parseInt(userData.age, 10);
                const userAgeGroup = getAgeGroup(userAge);

                if (!userAgeGroup) return;

                // averageSalaryData.js에서 해당 연령대의 평균 수입(월급) 찾기
                const salaryData = averageMonthlySalary.find(
                    (data) => data.ageGroup === userAgeGroup
                );
                
                // 차트 단위가 만원이므로 10000으로 나눔 (기존 차트 데이터 단위에 맞게 조정 필요)
                // 현재 차트 데이터가 1200 (120만원) 단위로 추정되므로, 실제 월급 값을 10000으로 나누어 '만원' 단위로 변환
                const avgIncomeInTenThousand = salaryData ? salaryData.monthlySalary / 10000 : 0;

                // Dexie에서 자산, 지출 평균 가져오기 (기존 로직 유지)
                const ageGroupForDexie = userAgeGroup.replace('세이하', '').replace('세',''); // '20-24세' -> '20-24'
                const averageData = await db.averages.where('age_group').equals(ageGroupForDexie).first();
                const avgAsset = averageData ? averageData.avg_asset : 0;
                const avgExpense = averageData ? averageData.avg_expense : 0;

                // 모든 차트 데이터 업데이트
                setIncomeChartData(prevData => ({
                    ...prevData,
                    comparison: { ...prevData.comparison, datasets: [{ ...prevData.comparison.datasets[0], data: [summary.monthlyIncome / 10000, avgIncomeInTenThousand, 1500] }] }
                }));

                setAssetChartData(prevData => ({
                    ...prevData,
                    comparison: { ...prevData.comparison, datasets: [{ ...prevData.comparison.datasets[0], data: [summary.currentAsset / 10000, avgAsset, 1500] }] }
                }));

                setExpenseChartData(prevData => ({
                    ...prevData,
                    comparison: { ...prevData.comparison, datasets: [{ ...prevData.comparison.datasets[0], data: [summary.monthlyExpense / 1000, avgExpense, 650] }] }
                }));

            } catch (error) {
                console.error("평균 데이터 로드 및 차트 업데이트 중 에러 발생:", error);
            }
        };

        fetchAndSetData();
    }, []); // 페이지가 처음 로드될 때 한 번만 실행되도록 빈 배열을 전달


    // 연도 validation 핸들러
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
            data: assetChartData,
            color: 'text-green-600',
            chart1: { type: Doughnut, title: '전체 자산 비율', source: assetChartData.ratio },
            chart2: { type: Bar, title: '동 연령 평균 및 재무 목표 비교', source: assetChartData.comparison },
            chart3: { type: Line, title: '1년 자산 추이', source: assetChartData.yearly }
        },
        expense: {
            title: '총 지출 현황',
            data: expenseChartData,
            color: 'text-red-500',
            chart1: { type: Doughnut, title: '월별 지출 비율', source: expenseChartData.monthly },
            chart2: { type: Bar, title: '동 연령 평균 및 재무 목표 비교', source: expenseChartData.comparison },
            chart3: { type: Line, title: '1년 지출 추이', source: expenseChartData.yearly }
        },
        income: {
            title: '총 수입 현황',
            data: incomeChartData,
            color: 'text-blue-500',
            chart1: { type: Doughnut, title: '월별 수입 비율', source: incomeChartData.monthly },
            chart2: { type: Bar, title: '동 연령 평균 및 재무 목표 비교', source: incomeChartData.comparison },
            chart3: { type: Line, title: '1년 수입 추이', source: incomeChartData.yearly }
        },
    };

    const currentConfig = tabConfig[activeTab];

    const formatCurrency = (amount) => {
        return amount ? (amount / 10000).toLocaleString('ko-KR') + '만' : 0;
    };

    const commonOptions = {
        responsive: true,
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

    const doughnutOptions = {
        ...commonOptions,
        scales: { x: { display: false }, y: { display: false } },
        cutout: '70%',
        layout: { padding: 50 },
        plugins: {
            legend: { display: false },
            tooltip: {},
            datalabels: {
                color: '#333',
                textAlign: 'center',
                font: { weight: 'bold', size: 10 },
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + '%';
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}\n${percentage}`;
                },
                anchor: 'end',
                align: 'end',
                offset: 5,
            },
        },
    };

    // analysispage의 3번째 페이지로 이동하는 함수
    const handleAnalysisEdit = () => {
        window.location.href = "/analysis?page=3";
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 80,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 768,
                    margin: "0 auto",
                    padding: "24px 8px",
                }}
            >
                <h1 style={{ textAlign: "center", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, color: "#222", marginBottom: 24 }}>결과 대시보드</h1>
                <div style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: "40px 20px",
                    marginBottom: 24,
                    minHeight: "120px",
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginBottom: 20,
                        gap: "4px"
                    }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#666", marginRight: "4px" }}>Period:</span>
                        <select
                            value={startYear}
                            onChange={handleStartYearChange}
                            style={{
                                padding: "6px 10px",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#333",
                                background: "#fff",
                                marginRight: "2px"
                            }}
                        >
                            {Array.from({ length: 10 }, (_, i) => 2020 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <span style={{ fontSize: 14, fontWeight: 500, color: "#666", margin: "0 2px" }}>-</span>
                        <select
                            value={endYear}
                            onChange={handleEndYearChange}
                            style={{
                                padding: "6px 10px",
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#333",
                                background: "#fff",
                                marginLeft: "2px",
                                marginRight: "4px"
                            }}
                        >
                            {Array.from({ length: 10 }, (_, i) => 2020 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    
                    <p style={{ fontSize: 16, fontWeight: 600, color: "#666", marginBottom: 20, textAlign: "left", marginLeft: "0px" }}>이번 달 자산, 지출, 수입 요약</p>
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        fontSize: 18, 
                        fontWeight: 700,
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}>
                        <span style={{ color: "#10B981", flex: "1", textAlign: "left", minWidth: "120px" }}>자산: {summary.currentAsset.toLocaleString('ko-KR')}원</span>
                        <span style={{ color: "#EF4444", flex: "1", textAlign: "center", minWidth: "120px" }}>지출: {summary.monthlyExpense.toLocaleString('ko-KR')}원</span>
                        <span style={{ color: "#3B82F6", flex: "1", textAlign: "right", minWidth: "120px" }}>수입: {summary.monthlyIncome.toLocaleString('ko-KR')}원</span>
                    </div>
                </div>
                <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: 24 }}>
                    {['asset', 'expense', 'income'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1,
                                padding: "12px 0",
                                fontWeight: 600,
                                fontSize: 16,
                                color: activeTab === tab ? "#4B4BFF" : "#888",
                                borderBottom: activeTab === tab ? "2px solid #4B4BFF" : "none",
                                background: "none",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            {tab === 'asset' ? '자산' : tab === 'expense' ? '지출' : '수입'}
                        </button>
                    ))}
                </div>
                <section style={{ marginBottom: 40 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 18 }}>{currentConfig.title}</h2>
                    <ChartBlock
                        config={currentConfig.chart1}
                        options={doughnutOptions}
                        isDoughnut={true}
                        onEdit={handleAnalysisEdit}
                    />
                    <ChartBlock
                        config={currentConfig.chart2}
                        options={commonOptions}
                        wide={true}
                    />
                    <ChartBlock
                        config={currentConfig.chart3}
                        options={commonOptions}
                        wide={true}
                    />
                </section>
            </div>
            <BottomNavbar active="dashboard" />
        </div>
    );
};

export default DashboardPage;

// ChartBlock 컴포넌트
const ChartBlock = ({ config, options, isDoughnut = false, onEdit, wide = false }) => {
    const ChartComponent = config.type;

    const formatCurrencyDisplay = (amount) => {
        return amount.toLocaleString('ko-KR');
    };

    const totalAmount = config.source.datasets[0].data.reduce((a, b) => a + b, 0);
    const dataLabels = config.source.labels;
    const dataValues = config.source.datasets[0].data;
    const dataColors = config.source.datasets[0].backgroundColor;

    return (
        <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px #eee",
            padding: wide ? "16px 8px" : "24px 16px",
            marginBottom: 24,
            border: "1px solid #eee",
            overflowX: "visible"
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#444" }}>{config.title}</h3>
                {isDoughnut && (
                    <button
                        onClick={onEdit}
                        style={{
                            background: "#4B4BFF",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            padding: "4px 14px",
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        편집
                    </button>
                )}
            </div>
            {isDoughnut ? (
                <div style={{ display: "flex", alignItems: "flex-start", height: 340, minHeight: 340 }}>
                    <div style={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "340px", height: "340px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ChartComponent data={config.source} options={options} />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "12px 4px 12px 16px" }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "#222", marginBottom: 1 }}>
                            {config.title.includes('자산') ? '자산 총액' : 
                             config.title.includes('지출') ? '지출 총액' : '수입 총액'}
                        </p>
                        <p style={{ fontSize: 22, fontWeight: 800, color: "#4B4BFF", marginBottom: 3 }}>
                            {formatCurrencyDisplay(totalAmount)} <span style={{ fontSize: 16, color: "#888", fontWeight: 500 }}>만원</span>
                        </p>
                        <div style={{ overflowY: "auto", maxHeight: "270px" }}>
                            {dataLabels.map((label, index) => {
                                const value = dataValues[index];
                                const color = dataColors[index];
                                const percentage = totalAmount > 0 ? ((value / totalAmount) * 100).toFixed(0) : 0;
                                return (
                                    <div key={label} style={{ display: "flex", alignItems: "center", fontSize: 13, marginBottom: 3, flexWrap: "wrap" }}>
                                        <span style={{ width: 12, height: 12, borderRadius: "50%", marginRight: 4, background: color, display: "inline-block", flexShrink: 0 }}></span>
                                        <span style={{ fontWeight: 500, color: "#555", minWidth: "fit-content", marginRight: "auto" }}>{label}</span>
                                        <span style={{ fontWeight: 700, color, whiteSpace: "nowrap" }}>{formatCurrencyDisplay(value)} ({percentage}%)</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    position: "relative",
                    height: 220,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{ width: "100%", height: "100%", padding: "4px 0px" }}>
                        <ChartComponent data={config.source} options={options} />
                    </div>
                </div>
            )}
        </div>
    );
};