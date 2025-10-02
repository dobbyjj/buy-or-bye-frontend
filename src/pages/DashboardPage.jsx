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
    const [summary, setSummary] = useState({
        currentAsset: 12500000,
        monthlyIncome: 1200000,
        monthlyExpense: 829000,
    });
    const [isAnalysisData, setIsAnalysisData] = useState(true); // Analysis 데이터인지 가계부 데이터인지 구분

    const [assetChartData, setAssetChartData] = useState({
        ratio: { labels: ['부동산', '대출', '예금/현금', '기타 자산'], datasets: [{ data: [5000000, 2000000, 3500000, 2000000], backgroundColor: ['#EF4444', '#F59E0B', '#14B8A6', '#3B82F6'], borderWidth: 0 }] },
        comparison: { 
            labels: ['나', '동 연령 평균', '재무 목표'], 
            datasets: [
                { label: '부동산', data: [500, 0, 600], backgroundColor: '#EF4444', stack: 'stack1' },
                { label: '대출', data: [200, 0, 300], backgroundColor: '#F59E0B', stack: 'stack1' },
                { label: '예금/현금', data: [350, 0, 400], backgroundColor: '#14B8A6', stack: 'stack1' },
                { label: '기타 자산', data: [200, 0, 200], backgroundColor: '#3B82F6', stack: 'stack1' }
            ]
        },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 자산', data: [], borderColor: '#10B981', tension: 0.3, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.2)' }] },
    });
    const [expenseChartData, setExpenseChartData] = useState({
        monthly: { labels: ['식비', '쇼핑', '교통', '주거/관리', '문화/여가', '생활용품', '기타'], datasets: [{ data: [350000, 100000, 150000, 200000, 129000, 80000, 90000], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'], borderWidth: 0 }] },
        comparison: { 
            labels: ['나', '동 연령 평균', '재무 목표'], 
            datasets: [
                { label: '식비', data: [35, 0, 25], backgroundColor: '#FF6384', stack: 'stack1' },
                { label: '쇼핑', data: [10, 0, 8], backgroundColor: '#36A2EB', stack: 'stack1' },
                { label: '교통', data: [15, 0, 10], backgroundColor: '#FFCE56', stack: 'stack1' },
                { label: '주거/관리', data: [20, 0, 15], backgroundColor: '#4BC0C0', stack: 'stack1' },
                { label: '문화/여가', data: [12.9, 0, 5], backgroundColor: '#9966FF', stack: 'stack1' },
                { label: '생활용품', data: [8, 0, 2], backgroundColor: '#FF9F40', stack: 'stack1' },
                { label: '기타', data: [9, 0, 5], backgroundColor: '#C9CBCF', stack: 'stack1' }
            ]
        },
                yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 지출', data: [], borderColor: '#EF4444', tension: 0.3, fill: true, backgroundColor: 'rgba(239, 68, 68, 0.2)' }] },
    });
    const [incomeChartData, setIncomeChartData] = useState({
        monthly: { labels: ['월급', '투자(부동산, 금융 등)', '용돈', '기타 부수입'], datasets: [{ data: [1000000, 100000, 50000, 50000], backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24', '#8B5CF6'], borderWidth: 0 }] },
        comparison: { 
            labels: ['나', '동 연령 평균', '재무 목표'], 
            datasets: [
                { label: '월급', data: [100, 0, 120], backgroundColor: '#22C55E', stack: 'stack1' },
                { label: '투자(부동산, 금융 등)', data: [10, 0, 15], backgroundColor: '#14B8A6', stack: 'stack1' },
                { label: '용돈', data: [5, 0, 10], backgroundColor: '#FBBF24', stack: 'stack1' },
                { label: '기타 부수입', data: [5, 0, 5], backgroundColor: '#8B5CF6', stack: 'stack1' }
            ]
        },
        yearly: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], datasets: [{ label: '총 수입', data: [], borderColor: '#22C55E', tension: 0.3, fill: false }] },
    });
    
    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                // Ledger에서 자산 업데이트 데이터 확인
                const dashboardAssetUpdate = localStorage.getItem('dashboardAssetUpdate');
                if (dashboardAssetUpdate) {
                    const assetData = JSON.parse(dashboardAssetUpdate);
                    setAssetChartData(prev => ({
                        ...prev,
                        ratio: assetData.ratio,
                        comparison: assetData.comparison
                    }));
                    // 업데이트 완료 후 데이터 제거
                    localStorage.removeItem('dashboardAssetUpdate');
                }

                // Analysis 데이터 읽어오기
                let userAge = 25;
                let analysisData = null;
                const userDataString = localStorage.getItem('userData');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    analysisData = userData;
                    if (userData && userData.age) {
                        userAge = parseInt(userData.age, 10);
                    }
                }

                // 가계부 데이터 확인 (향후 구현)
                // const ledgerDataString = localStorage.getItem('ledgerData');
                // let ledgerData = null;
                // if (ledgerDataString) {
                //     ledgerData = JSON.parse(ledgerDataString);
                // }

                // Summary 데이터 업데이트 (Analysis 데이터 기반)
                if (analysisData) {
                    const newSummary = {
                        currentAsset: (
                            parseInt(analysisData.realEstateValue || 0) + 
                            parseInt(analysisData.depositAmount || 0) + 
                            parseInt(analysisData.otherInvestments || 0) - 
                            parseInt(analysisData.loanAmount || 0)
                        ),
                        monthlyIncome: (
                            parseInt(analysisData.monthlyIncome || 0) + 
                            parseInt(analysisData.investmentIncome || 0) + 
                            parseInt(analysisData.allowanceIncome || 0) + 
                            parseInt(analysisData.otherIncome || 0)
                        ),
                        monthlyExpense: (
                            parseInt(analysisData.foodExpense || 0) + 
                            parseInt(analysisData.shoppingExpense || 0) + 
                            parseInt(analysisData.transportExpense || 0) + 
                            parseInt(analysisData.housingExpense || 0) + 
                            parseInt(analysisData.cultureExpense || 0) + 
                            parseInt(analysisData.dailyGoodsExpense || 0) + 
                            parseInt(analysisData.otherExpense || 0)
                        )
                    };
                    setSummary(newSummary);
                    setIsAnalysisData(true);
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
                
                // --- 수입 차트 데이터 업데이트 (각 항목별로) ---
                // 도넛 차트와 동일한 데이터 사용 (만원 단위로 변환)
                const mySalary = parseInt(analysisData.monthlyIncome || 0) / 10000;
                const myInvestment = parseInt(analysisData.investmentIncome || 0) / 10000;
                const myAllowance = parseInt(analysisData.allowanceIncome || 0) / 10000;
                const myOtherIncome = parseInt(analysisData.otherIncome || 0) / 10000;
                
                // 동 연령 평균 수입 데이터 (같은 비율 적용)
                const avgSalary = avgIncomeInTenThousand * 0.833;
                const avgInvestment = avgIncomeInTenThousand * 0.083;
                const avgAllowance = avgIncomeInTenThousand * 0.042;
                const avgOtherIncome = avgIncomeInTenThousand * 0.042;
                
                // 재무 목표는 기본값 유지
                const targetSalary = 120;
                const targetInvestment = 15;
                const targetAllowance = 10;
                const targetOtherIncome = 5;

                setIncomeChartData(prev => ({
                    ...prev,
                    comparison: { 
                        labels: ['나', '동 연령 평균', '재무 목표'], 
                        datasets: [
                            { label: '월급', data: [mySalary, avgSalary, targetSalary], backgroundColor: '#22C55E', stack: 'stack1' },
                            { label: '투자(부동산, 금융 등)', data: [myInvestment, avgInvestment, targetInvestment], backgroundColor: '#14B8A6', stack: 'stack1' },
                            { label: '용돈', data: [myAllowance, avgAllowance, targetAllowance], backgroundColor: '#FBBF24', stack: 'stack1' },
                            { label: '기타 부수입', data: [myOtherIncome, avgOtherIncome, targetOtherIncome], backgroundColor: '#8B5CF6', stack: 'stack1' }
                        ]
                    }
                }));

                // --- 지출 차트 데이터 업데이트 (각 항목별로) ---
                // 도넛 차트와 동일한 데이터 사용 (만원 단위로 변환)
                const myFood = parseInt(analysisData.foodExpense || 0) / 10000;
                const myShopping = parseInt(analysisData.shoppingExpense || 0) / 10000;
                const myTransport = parseInt(analysisData.transportExpense || 0) / 10000;
                const myHousing = parseInt(analysisData.housingExpense || 0) / 10000;
                const myCulture = parseInt(analysisData.cultureExpense || 0) / 10000;
                const myCosmetics = parseInt(analysisData.dailyGoodsExpense || 0) / 10000;
                const myOtherExpense = parseInt(analysisData.otherExpense || 0) / 10000;
                
                // 동 연령 평균 지출 (같은 비율 적용)
                const avgFood = avgExpenseInTenThousand * 0.30;
                const avgShopping = avgExpenseInTenThousand * 0.15;
                const avgTransport = avgExpenseInTenThousand * 0.12;
                const avgHousing = avgExpenseInTenThousand * 0.25;
                const avgCulture = avgExpenseInTenThousand * 0.10;
                const avgCosmetics = avgExpenseInTenThousand * 0.05;
                const avgOtherExpense = avgExpenseInTenThousand * 0.08;

                setExpenseChartData(prev => ({
                    ...prev,
                    comparison: { 
                        labels: ['나', '동 연령 평균', '재무 목표'], 
                        datasets: [
                            { label: '식비', data: [myFood, avgFood, 25], backgroundColor: '#FF6384', stack: 'stack1' },
                            { label: '쇼핑', data: [myShopping, avgShopping, 8], backgroundColor: '#36A2EB', stack: 'stack1' },
                            { label: '교통', data: [myTransport, avgTransport, 10], backgroundColor: '#FFCE56', stack: 'stack1' },
                            { label: '주거/관리', data: [myHousing, avgHousing, 15], backgroundColor: '#4BC0C0', stack: 'stack1' },
                            { label: '문화/여가', data: [myCulture, avgCulture, 5], backgroundColor: '#9966FF', stack: 'stack1' },
                            { label: '생활용품', data: [myCosmetics, avgCosmetics, 2], backgroundColor: '#FF9F40', stack: 'stack1' },
                            { label: '기타', data: [myOtherExpense, avgOtherExpense, 5], backgroundColor: '#C9CBCF', stack: 'stack1' }
                        ]
                    }
                }));
                
                // --- 자산 차트 데이터 업데이트 (각 항목별로) ---
                // 도넛 차트와 동일한 데이터 사용 (만원 단위로 변환)
                const myRealEstate = parseInt(analysisData.realEstateValue || 0) / 10000;
                const myLoan = parseInt(analysisData.loanAmount || 0) / 10000;
                const myDeposit = parseInt(analysisData.depositAmount || 0) / 10000;
                const myOtherAsset = parseInt(analysisData.otherInvestments || 0) / 10000;
                
                // 동 연령 평균 자산 (다른 비율 적용)
                const avgRealEstate = avgAssetInTenThousand * 0.35;
                const avgLoan = avgAssetInTenThousand * 0.15;
                const avgDeposit = avgAssetInTenThousand * 0.30;
                const avgOtherAsset = avgAssetInTenThousand * 0.20;

                setAssetChartData(prev => ({
                    ...prev,
                    ratio: { 
                        labels: ['부동산', '대출', '예금/현금', '기타 자산'], 
                        datasets: [{ 
                            data: [
                                parseInt(analysisData.realEstateValue || 0), 
                                parseInt(analysisData.loanAmount || 0), 
                                parseInt(analysisData.depositAmount || 0), 
                                parseInt(analysisData.otherInvestments || 0)
                            ], 
                            backgroundColor: ['#EF4444', '#F59E0B', '#14B8A6', '#3B82F6'], 
                            borderWidth: 0 
                        }] 
                    },
                    comparison: { 
                        labels: ['나', '동 연령 평균', '재무 목표'], 
                        datasets: [
                            { label: '부동산', data: [myRealEstate, avgRealEstate, 600], backgroundColor: '#EF4444', stack: 'stack1' },
                            { label: '대출', data: [myLoan, avgLoan, 300], backgroundColor: '#F59E0B', stack: 'stack1' },
                            { label: '예금/현금', data: [myDeposit, avgDeposit, 400], backgroundColor: '#14B8A6', stack: 'stack1' },
                            { label: '기타 자산', data: [myOtherAsset, avgOtherAsset, 200], backgroundColor: '#3B82F6', stack: 'stack1' }
                        ]
                    }
                }));

                // 수입 도넛 차트 데이터 업데이트
                setIncomeChartData(prev => ({
                    ...prev,
                    monthly: { 
                        labels: ['월급', '투자(부동산, 금융 등)', '용돈', '기타 부수입'], 
                        datasets: [{ 
                            data: [
                                parseInt(analysisData.monthlyIncome || 0),
                                parseInt(analysisData.investmentIncome || 0), 
                                parseInt(analysisData.allowanceIncome || 0), 
                                parseInt(analysisData.otherIncome || 0)
                            ], 
                            backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24', '#8B5CF6'], 
                            borderWidth: 0 
                        }] 
                    }
                }));

                // 지출 도넛 차트 데이터 업데이트  
                setExpenseChartData(prev => ({
                    ...prev,
                    monthly: { 
                        labels: ['식비', '쇼핑', '교통', '주거/관리', '문화/여가', '생활용품', '기타'], 
                        datasets: [{ 
                            data: [
                                parseInt(analysisData.foodExpense || 0),
                                parseInt(analysisData.shoppingExpense || 0), 
                                parseInt(analysisData.transportExpense || 0), 
                                parseInt(analysisData.housingExpense || 0), 
                                parseInt(analysisData.cultureExpense || 0), 
                                parseInt(analysisData.dailyGoodsExpense || 0), 
                                parseInt(analysisData.otherExpense || 0)
                            ], 
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'], 
                            borderWidth: 0 
                        }] 
                    }
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
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    fontSize: 12
                }
            },
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
            y: { 
                beginAtZero: true, 
                display: true, 
                stacked: true,
                ticks: { callback: (value) => value + '만' } 
            },
            x: { 
                display: true,
                stacked: true
            }
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
                    <ChartBlock config={currentConfig.chart1} options={doughnutOptions} isDoughnut={true} isAnalysisData={isAnalysisData} />
                    <ChartBlock config={currentConfig.chart2} options={commonOptions} wide={true} showGoalEdit={true} activeTab={activeTab} isAnalysisData={isAnalysisData} />
                    <ChartBlock config={currentConfig.chart3} options={commonOptions} wide={true} isAnalysisData={isAnalysisData} />
                </section>
            </div>
            <BottomNavbar active="dashboard" />
        </div>
    );
};

export default DashboardPage;

const ChartBlock = ({ config, options, isDoughnut = false, showGoalEdit = false, activeTab, isAnalysisData = false }) => {
    const ChartComponent = config.type;

    const handleGoalEdit = () => {
        window.location.href = `/goal-edit?type=${activeTab}`;
    };

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
                {showGoalEdit && (<button onClick={handleGoalEdit} style={{ background: "#4B4BFF", color: "#fff", border: "none", borderRadius: 8, padding: "4px 14px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>목표치 변경</button>)}
            </div>
            {isAnalysisData && (
                <div style={{ 
                    marginBottom: 16, 
                    fontSize: 13, 
                    color: "#999",
                    fontStyle: "italic"
                }}>
                    재무 상태 분석시 입력해주신 정보는 가계부를 사용하면 실제 숫자로 대체됩니다.
                </div>
            )}
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