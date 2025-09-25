// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; // 👈 Doughnut 차트 임포트
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // 👈 Chart.js 필수 요소 임포트
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';

// Chart.js에서 도넛 차트 사용을 위해 필수 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend); 


const DashboardPage = () => {
  // 현재 보고 있는 탭 상태 (자산: asset, 지출: expense, 수입: earn)
  const [activeTab, setActiveTab] = useState('expense'); 

  // 임시 데이터 (실제 데이터는 API로 받아와야 합니다.)
  const summary = {
    totalAsset: 12500000,
    currentExpense: 829000,
    currentEarn: 1200000,
  };
  
  // 지출 상세 데이터 예시 (카테고리별)
  const expenseData = {
    labels: ['식비', '교통', '쇼핑', '문화', '기타'],
    datasets: [
      {
        data: [350000, 150000, 100000, 129000, 100000], // 총합 829,000
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 0,
      },
    ],
  };

  // 수입 상세 데이터 예시 (카테고리별)
  const earnData = {
    labels: ['월급', '부수입', '투자수익'],
    datasets: [
      {
        data: [1000000, 100000, 100000], // 총합 1,200,000
        backgroundColor: ['#22C55E', '#14B8A6', '#FBBF24'],
        borderWidth: 0,
      },
    ],
  };

  // 탭에 따라 중앙에 표시될 정보와 차트 데이터를 설정
  const chartConfig = activeTab === 'expense' 
    ? { title: '지출 합계', amount: summary.currentExpense, categories: expenseData.labels.length, color: 'text-orange-600', data: expenseData }
    : activeTab === 'earn'
    ? { title: '수입 합계', amount: summary.currentEarn, categories: earnData.labels.length, color: 'text-indigo-600', data: earnData }
    : { title: '총 자산', amount: summary.totalAsset, categories: 10, color: 'text-green-600', data: {} }; // 자산 차트는 추후 구현

  // 도넛 차트 옵션 설정
  const chartOptions = {
    responsive: true,
    cutout: '70%', // 도넛 중앙의 빈 공간 크기 (중앙 텍스트를 위한 공간)
    plugins: {
        legend: {
            display: false // 범례는 숨김 (모바일 화면의 공간 절약을 위해)
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    return `${label}: ${value.toLocaleString()}원`;
                }
            }
        }
    }
  };


  return (
    <MobileLayout>
      <div className="pb-20 pt-4 px-4"> 
        {/* === 1. 상단 정보 (Report, This Month) === */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">대시보드</h1>
          <button className="text-sm text-gray-500 hover:text-indigo-600">
            월 선택 버튼 ⬇️
          </button>
        </header>

        {/* === 2. This Month 요약 카드 === */}
        <div className="bg-white p-4 rounded-xl shadow-lg border-b-2 mb-8">
          <h2 className="text-base font-semibold text-gray-700 mb-4">이번 달</h2>
          
          {/* 자산/수입/지출 요약 라인 */}
          <SummaryLine label="자산" amount={summary.totalAsset} color="bg-green-500" />
          <SummaryLine label="지출" amount={summary.currentExpense} color="bg-orange-500" />
          <SummaryLine label="수입" amount={summary.currentEarn} color="bg-indigo-500" />
        </div>
        
        {/* === 3. 자산/지출/수입 탭 및 차트 영역 === */}
        <section className="mt-8">
          {/* 탭 버튼 */}
          <div className="flex space-x-4 border-b pb-2 mb-8">
            <TabButton label="자산" active={activeTab === 'asset'} onClick={() => setActiveTab('asset')} />
            <TabButton label="지출" active={activeTab === 'expense'} onClick={() => setActiveTab('expense')} />
            <TabButton label="수입" active={activeTab === 'earn'} onClick={() => setActiveTab('earn')} />
          </div>
          
          {/* 실제 도넛 차트 영역 */}
          <div className="flex justify-center items-center h-80 relative">
            
            {/* 💥💥 실제 차트 컴포넌트 사용 💥💥 */}
            {activeTab !== 'asset' && (
                <div className="w-64 h-64"> 
                    <Doughnut data={chartConfig.data} options={chartOptions} />
                </div>
            )}
            {activeTab === 'asset' && (
                 <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    자산 차트 영역 (구현 예정)
                </div>
            )}
            {/* 💥💥 차트 중앙 텍스트 오버레이 💥💥 */}
            <div className="absolute text-center">
              <p className={`text-xl font-bold ${chartConfig.color}`}>{chartConfig.title}</p>
              <p className="text-3xl font-extrabold text-gray-800">{chartConfig.amount.toLocaleString()}원</p>
              <p className="text-sm text-gray-500 mt-1">
                {chartConfig.categories}개 카테고리
              </p>
            </div>
          </div>
        </section>
        
        {/* === 4. 차트 아래 상세 목록 (범례 역할) === */}
        <div className="mt-8 space-y-3">
             <h3 className="text-base font-semibold text-gray-700">상세 항목 ({chartConfig.categories}개)</h3>
             
             {/* 임시 목록 (실제 데이터와 연결 필요) */}
             {chartConfig.data.labels?.map((label, index) => (
                <div key={label} className="flex justify-between p-3 bg-white border rounded-lg shadow-sm">
                    <div className="flex items-center">
                         {/* 작은 색상 점 */}
                        <div 
                          className="w-3 h-3 rounded-full mr-3" 
                          style={{ backgroundColor: chartConfig.data.datasets[0].backgroundColor[index] }}
                        ></div>
                        <span className="text-gray-700 font-medium">{label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                        {chartConfig.data.datasets[0].data[index]?.toLocaleString()}원
                    </span>
                </div>
             ))}
        </div>

      </div>
      
      {/* 하단 내비게이션 바 */}
      <BottomNavbar />
    </MobileLayout>
  );
};

export default DashboardPage;

// --- 하위 컴포넌트 정의 (SummaryLine, TabButton은 이전과 동일) ---

// 요약 라인 컴포넌트 (지출, 수입, 자산 바)
const SummaryLine = ({ label, amount, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-sm text-gray-700">
      <span>{label}</span>
      <span className="font-semibold">{amount.toLocaleString()}원</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-0.5">
      <div 
        className={`${color} h-2 rounded-full`} 
        style={{ width: `${Math.min(amount / 1500000 * 100, 100)}%` }} // 임시 비율 계산
      ></div>
    </div>
  </div>
);

// 탭 버튼 컴포넌트
const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      py-2 px-3 text-sm font-semibold transition duration-200 
      ${active 
        ? 'text-indigo-600 border-b-2 border-indigo-600' 
        : 'text-gray-500 hover:text-gray-800'
      }
    `}
  >
    {label}
  </button>
);
// --- DoughnutChartPlaceholder 컴포넌트는 삭제됩니다. ---