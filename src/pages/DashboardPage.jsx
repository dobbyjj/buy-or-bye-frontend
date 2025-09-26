import React, { useState } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js'; 
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.js의 필수 요소 및 플러그인 모두 등록
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ChartDataLabels); 


const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('asset'); // 초기 탭은 자산
    
    // 임시 데이터
    const summary = {
        currentAsset: 12500000,
        monthlyIncome: 1200000,
        monthlyExpense: 829000,
    };

    // ----------------------------------------------------
    // 그래프 데이터 정의 (유지)
    // ----------------------------------------------------
    
    // 1. 자산 데이터
    const assetChartData = {
        ratio: {
            labels: ['예금/적금', '투자', '현금', '부동산'],
            datasets: [{ data: [500, 350, 50, 350], backgroundColor: ['#14B8A6', '#3B82F6', '#FBBF24', '#EF4444'], borderWidth: 0 }],
        },
        comparison: {
            labels: ['나', '동 연령 평균', '재무 목표'],
            datasets: [
                { label: '자산', data: [1250, 900, 1500], backgroundColor: '#3B82F6' },
            ],
        },
        yearly: {
            labels: ['1월', '3월', '5월', '7월', '9월', '11월'],
            datasets: [
                { label: '총 자산', data: [1000, 1150, 1200, 1100, 1250, 1300], borderColor: '#10B981', tension: 0.3, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.2)' },
            ],
        },
    };

    // 2. 지출 데이터
    const expenseChartData = {
        monthly: {
            labels: ['식비', '교통', '쇼핑', '문화', '기타'],
            datasets: [{ data: [350, 150, 100, 129, 100], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], borderWidth: 0 }],
        },
        comparison: {
            labels: ['나', '동 연령 목표', '동 연령 평균'],
            datasets: [
                { label: '지출', data: [829, 650, 950], backgroundColor: '#FF6384' },
            ],
        },
        yearly: {
            labels: ['1월', '3월', '5월', '7월', '9월', '11월'],
            datasets: [
                { label: '총 지출', data: [750, 800, 780, 900, 829, 700], borderColor: '#EF4444', tension: 0.3, fill: false },
            ],
        },
    };
    
    // 3. 수입 데이터
    const incomeChartData = {
        monthly: {
            labels: ['월급', '투자수익', '부수입'],
            datasets: [{ data: [1000, 100, 100], backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24'], borderWidth: 0 }],
        },
        comparison: {
            labels: ['나', '동 연령 목표', '동 연령 평균'],
            datasets: [
                { label: '수입', data: [1200, 1500, 1100], backgroundColor: '#22C55E' },
            ],
        },
        yearly: {
            labels: ['1월', '3월', '5월', '7월', '9월', '11월'],
            datasets: [
                { label: '총 수입', data: [1100, 1250, 1200, 1300, 1200, 1400], borderColor: '#22C55E', tension: 0.3, fill: false },
            ],
        },
    };

    const tabConfig = {
        asset: {
            title: '총 자산 현황',
            data: assetChartData,
            color: 'text-green-600',
            chart1: { type: Doughnut, title: '전체 자산 비율', source: assetChartData.ratio },
            chart2: { type: Bar, title: '동 연령 비교', source: assetChartData.comparison },
            chart3: { type: Line, title: '1년 자산 추이', source: assetChartData.yearly },
        },
        expense: {
            title: '총 지출 현황',
            data: expenseChartData,
            color: 'text-red-500',
            chart1: { type: Doughnut, title: '월별 지출 레이블', source: expenseChartData.monthly },
            chart2: { type: Bar, title: '동 연령 vs 목표 지출 비교', source: expenseChartData.comparison },
            chart3: { type: Line, title: '1년 지출 추이', source: expenseChartData.yearly },
        },
        income: {
            title: '총 수입 현황',
            data: incomeChartData,
            color: 'text-blue-500',
            chart1: { type: Doughnut, title: '월별 수입 레이블', source: incomeChartData.monthly },
            chart2: { type: Bar, title: '동 연령 vs 목표 수입 비교', source: incomeChartData.comparison },
            chart3: { type: Line, title: '1년 수입 추이', source: incomeChartData.yearly },
        },
    };

    const currentConfig = tabConfig[activeTab];

    // 금액 포맷팅 함수
    const formatCurrency = (amount) => {
        return amount ? amount.toLocaleString('ko-KR') : 0;
    };


    // ----------------------------------------------------
    // 차트 옵션 정의 (레이블 잘림 문제 해결 로직 포함)
    // ----------------------------------------------------
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
                    },
                },
            },
            datalabels: { display: false }
        },
        scales: {
            y: { beginAtZero: true, display: true, ticks: { callback: (value) => value + '만' } },
            x: { display: true },
        },
    };

    // 💥 도넛 차트 전용 옵션 (레이블 잘림 문제 해결) 💥
    const doughnutOptions = {
        ...commonOptions,
        scales: { x: { display: false }, y: { display: false } },
        cutout: '70%',
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { /* ... */ }, 
            
            datalabels: {
                color: '#333',
                textAlign: 'center',
                font: {
                    weight: 'bold',
                    size: 9, // 글꼴 크기 축소
                },
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


    return (
        <MobileLayout activeNav="dashboard">
            <div className="p-4 bg-white min-h-screen pb-24">
                {/* === 상단 요약 === */}
                <h1 className="text-2xl font-bold text-gray-800 mb-6">결과 대시보드</h1>
                
                <div className="bg-gray-50 p-4 rounded-xl shadow-inner mb-8">
                    <p className="text-sm font-semibold text-gray-600 mb-2">이번 달 자산, 지출, 수입 요약</p>
                    <div className="flex justify-between text-lg font-bold">
                        <span className="text-green-600">자산: {formatCurrency(summary.currentAsset)}원</span>
                        <span className="text-red-500">지출: {formatCurrency(summary.monthlyExpense)}원</span>
                        <span className="text-blue-600">수입: {formatCurrency(summary.monthlyIncome)}원</span>
                    </div>
                </div>

                {/* === 탭 네비게이션 === */}
                <div className="flex space-x-4 border-b pb-2 mb-8">
                    {['asset', 'expense', 'income'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 font-semibold capitalize 
                                        ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                        >
                            {tab === 'asset' ? '자산' : tab === 'expense' ? '지출' : '수입'}
                        </button>
                    ))}
                </div>

                {/* === 탭별 차트 영역 === */}
                <section className="space-y-10">
                    <h2 className="text-xl font-bold text-gray-800">{currentConfig.title}</h2>
                    
                    {/* 차트 1: 도넛 차트 (외부 레이블 적용) */}
                    <ChartBlock config={currentConfig.chart1} options={doughnutOptions} isDoughnut={true} />

                    {/* 차트 2: 동 연령 vs 목표 비교 (바 그래프) */}
                    <ChartBlock config={currentConfig.chart2} options={commonOptions} />

                    {/* 차트 3: 1년 추이 그래프 (라인 그래프) */}
                    <ChartBlock config={currentConfig.chart3} options={commonOptions} />

                </section>
                
            </div>
            
            {/* 하단 내비게이션 바 */}
            <BottomNavbar isDashboard={true} /> 
        </MobileLayout>
    );
};

export default DashboardPage;

// --- 하위 차트 블록 컴포넌트 (레이블 잘림 문제 해결 로직 포함) ---
const ChartBlock = ({ config, options, isDoughnut = false }) => {
    const ChartComponent = config.type;

    // 금액 포맷팅 함수
    const formatCurrency = (amount) => {
        return amount.toLocaleString('ko-KR');
    };
    
    // 💥💥 중앙 총액 텍스트를 위한 데이터 추출 💥💥
    const totalAmount = config.source.datasets[0].data.reduce((a, b) => a + b, 0);


    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{config.title}</h3>
            
            {/* 💥💥 [수정] 도넛 차트일 경우 총액을 상단에 배치하여 공간 확보 💥💥 */}
            {isDoughnut && (
                 <div className="text-center mb-4">
                    <p className="text-sm font-bold text-gray-800">
                        {config.title.includes('비율') ? '총 자산 총액' : '월별 합계'}
                    </p>
                    <p className="text-3xl font-extrabold text-indigo-600">
                        {formatCurrency(totalAmount)}
                    </p>
                </div>
            )}
            
            {/* 💥💥 [수정] 차트 영역 크기를 획기적으로 축소하여 레이블 공간 극대화 💥💥 */}
            <div className="relative h-48 w-full flex items-center justify-center"> 
                {/* 차트 컨테이너를 부모 요소의 60%로 줄여 레이블 공간 확보 */}
                <div className="h-full w-3/5"> 
                    <ChartComponent data={config.source} options={options} />
                </div>
            </div>
        </div>
    );
};
