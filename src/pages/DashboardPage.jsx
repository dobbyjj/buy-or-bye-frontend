import React, { useState, useEffect } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import BottomNavbar from '../components/common/BottomNavbar';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { db } from '../db.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ChartDataLabels);

const getAgeGroup = (age) => {
    if (age >= 20 && age <= 24) return '20-24';
    if (age >= 25 && age <= 29) return '25-29';
    if (age >= 30 && age <= 34) return '30-34';
    return null;
};

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('asset');
    const [ageGroupAverage, setAgeGroupAverage] = useState({ asset: 0, expense: 0, income: 0 });

    const summary = {
        currentAsset: 12500000,
        monthlyIncome: 1200000,
        monthlyExpense: 829000,
    };

    const [assetChartData, setAssetChartData] = useState({
        ratio: { labels: ['예금', '투자', '현금', '부동산'], datasets: [{ data: [500, 350, 50, 350], backgroundColor: ['#14B8A6', '#3B82F6', '#FBBF24', '#EF4444'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 평균', '재무 목표'], datasets: [{ label: '자산', data: [1250, 0, 1500], backgroundColor: '#3B82F6' }] },
        yearly: { labels: ['1월', '3월', '5월', '7월', '9월', '11월'], datasets: [{ label: '총 자산', data: [1000, 1150, 1200, 1100, 1250, 1300], borderColor: '#10B981', tension: 0.3, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.2)' }] },
    });
    const [expenseChartData, setExpenseChartData] = useState({
        monthly: { labels: ['식비', '교통', '쇼핑', '문화', '기타'], datasets: [{ data: [350, 150, 100, 129, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 목표', '동 연령 평균'], datasets: [{ label: '지출', data: [829, 650, 0], backgroundColor: '#FF6384' }] },
        yearly: { labels: ['1월', '3월', '5월', '7월', '9월', '11월'], datasets: [{ label: '총 지출', data: [750, 800, 780, 900, 829, 700], borderColor: '#EF4444', tension: 0.3, fill: false }] },
    });
    const [incomeChartData, setIncomeChartData] = useState({
        monthly: { labels: ['월급', '투자수익', '부수입'], datasets: [{ data: [1000, 100, 100], backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24'], borderWidth: 0 }] },
        comparison: { labels: ['나', '동 연령 목표', '동 연령 평균'], datasets: [{ label: '수입', data: [1200, 1500, 0], backgroundColor: '#22C55E' }] },
        yearly: { labels: ['1월', '3월', '5월', '7월', '9월', '11월'], datasets: [{ label: '총 수입', data: [1100, 1250, 1200, 1300, 1200, 1400], borderColor: '#22C55E', tension: 0.3, fill: false }] },
    });

    useEffect(() => {
        const fetchAverages = async () => {
            try {
                const userDataString = localStorage.getItem('userFinancialData');
                if (!userDataString) return;
                const userData = JSON.parse(userDataString);
                const userAge = parseInt(userData.age, 10);
                const userAgeGroup = getAgeGroup(userAge);
                if (!userAgeGroup) return;
                const averageData = await db.averages.where('age_group').equals(userAgeGroup).first();
                if (averageData) {
                    setAgeGroupAverage({
                        asset: averageData.avg_asset,
                        expense: averageData.avg_expense,
                        income: averageData.avg_income,
                    });
                }
            } catch (error) {
                console.error("평균 데이터 로드 중 에러 발생:", error);
            }
        };
        fetchAverages();
    }, []);

    useEffect(() => {
        setAssetChartData(prevData => ({
            ...prevData,
            comparison: {
                ...prevData.comparison,
                datasets: [{ ...prevData.comparison.datasets[0], data: [1250, ageGroupAverage.asset, 1500] }]
            }
        }));
        setExpenseChartData(prevData => ({
            ...prevData,
            comparison: {
                ...prevData.comparison,
                datasets: [{ ...prevData.comparison.datasets[0], data: [829, 650, ageGroupAverage.expense] }]
            }
        }));
        setIncomeChartData(prevData => ({
            ...prevData,
            comparison: {
                ...prevData.comparison,
                datasets: [{ ...prevData.comparison.datasets[0], data: [1200, 1500, ageGroupAverage.income] }]
            }
        }));
    }, [ageGroupAverage]);

    const tabConfig = {
        asset: {
            title: '총 자산 현황',
            data: assetChartData,
            color: 'text-green-600',
            chart1: { type: Doughnut, title: '전체 자산 비율', source: assetChartData.ratio },
            chart2: { type: Bar, title: '동 연령 비교', source: assetChartData.comparison },
            chart3: { type: Line, title: '1년 자산 추이', source: assetChartData.yearly }
        },
        expense: {
            title: '총 지출 현황',
            data: expenseChartData,
            color: 'text-red-500',
            chart1: { type: Doughnut, title: '월별 지출 레이블', source: expenseChartData.monthly },
            chart2: { type: Bar, title: '동 연령 vs 목표 지출 비교', source: expenseChartData.comparison },
            chart3: { type: Line, title: '1년 지출 추이', source: expenseChartData.yearly }
        },
        income: {
            title: '총 수입 현황',
            data: incomeChartData,
            color: 'text-blue-500',
            chart1: { type: Doughnut, title: '월별 수입 레이블', source: incomeChartData.monthly },
            chart2: { type: Bar, title: '동 연령 vs 목표 수입 비교', source: incomeChartData.comparison },
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
                        label += formatCurrency(context.parsed.y || context.parsed);
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
                    padding: "24px 16px",
                    marginBottom: 24,
                }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#666", marginBottom: 8 }}>이번 달 자산, 지출, 수입 요약</p>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 700 }}>
                        <span style={{ color: "#10B981" }}>자산: {summary.currentAsset.toLocaleString('ko-KR')}원</span>
                        <span style={{ color: "#EF4444" }}>지출: {summary.monthlyExpense.toLocaleString('ko-KR')}원</span>
                        <span style={{ color: "#3B82F6" }}>수입: {summary.monthlyIncome.toLocaleString('ko-KR')}원</span>
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

// ChartBlock 컴포넌트 수정
const ChartBlock = ({ config, options, isDoughnut = false, onEdit, wide = false }) => {
    const ChartComponent = config.type;

    const formatCurrencyDisplay = (amount) => {
        return amount.toLocaleString('ko-KR');
    };

    const totalAmount = config.source.datasets[0].data.reduce((a, b) => a + b, 0);
    const dataLabels = config.source.labels;
    const dataValues = config.source.datasets[0].data;
    const dataColors = config.source.datasets[0].backgroundColor;

    // wide가 true면 700px로 가로 화면 전체 사용
    const chartWidth = wide ? "700px" : "100%";
    const chartMaxWidth = wide ? "700px" : "100%";

    return (
        <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px #eee",
            padding: "24px 16px",
            marginBottom: 24,
            border: "1px solid #eee",
            overflowX: wide ? "auto" : "visible"
        }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: "#444" }}>{config.title}</h3>
                {/* 전체 자산 비율일 때만 편집 버튼 노출 */}
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
                <div style={{ display: "flex", alignItems: "flex-start", height: 220 }}>
                    <div style={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "100%", height: "100%" }}>
                            <ChartComponent data={config.source} options={options} />
                        </div>
                    </div>
                    <div style={{ width: "50%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 16 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "#222" }}>자산 총액</p>
                        {/* 자산 금액 옆에 단위(만원) 추가 */}
                        <p style={{ fontSize: 22, fontWeight: 800, color: "#4B4BFF", marginBottom: 12 }}>
                            {formatCurrencyDisplay(totalAmount)} <span style={{ fontSize: 16, color: "#888", fontWeight: 500 }}>만원</span>
                        </p>
                        <div>
                            {dataLabels.map((label, index) => {
                                const value = dataValues[index];
                                const color = dataColors[index];
                                const percentage = ((value / totalAmount) * 100).toFixed(0);
                                return (
                                    <div key={label} style={{ display: "flex", alignItems: "center", fontSize: 14, marginBottom: 6 }}>
                                        <span style={{ width: 12, height: 12, borderRadius: "50%", marginRight: 8, background: color, display: "inline-block" }}></span>
                                        <span style={{ fontWeight: 500, color: "#555" }}>{label}</span>
                                        <span style={{ marginLeft: "auto", fontWeight: 700, color }}>{formatCurrencyDisplay(value)} ({percentage}%)</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                // wide가 true면 width/maxWidth 100vw로 가로 전체 사용
                <div style={{
                    position: "relative",
                    height: 220,
                    width: chartWidth,
                    maxWidth: chartMaxWidth,
                    minWidth: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{ width: chartWidth, maxWidth: chartMaxWidth, height: "100%", padding: "24px 8px" }}>
                        <ChartComponent data={config.source} options={options} />
                    </div>
                </div>
            )}
        </div>
    );
};