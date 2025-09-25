// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';

// Chart.js에서 도넛 차트 사용을 위해 필수 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend); 


const DashboardPage = () => {
  // 현재 보고 있는 탭 상태 (자산: asset, 지출: expense, 수입: earn)
  const [activeTab, setActiveTab] = useState('expense'); 
  
  // 💥💥 1. 월 선택 상태 및 모달 상태 추가 💥💥
  const [selectedMonth, setSelectedMonth] = useState('2025년 9월'); // 초기값: 현재 월
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false); // 월 선택 모달 상태

  // 임시 데이터 (실제 데이터는 API로 받아와야 합니다.)
  const summary = {
    totalAsset: 12500000,
    currentExpense: 829000,
    currentEarn: 1200000,
  };
  
  // 자산 상세 데이터
  const assetData = {
    labels: ['예금/적금', '투자 (주식/펀드)', '현금', '부동산 (임시)'],
    datasets: [
      {
        data: [5000000, 3500000, 500000, 3500000], 
        backgroundColor: ['#16A34A', '#2563EB', '#FBBF24', '#DC2626'], 
        borderWidth: 0,
      },
    ],
  };

  // 지출 상세 데이터 예시 (카테고리별)
  const expenseData = {
    labels: ['식비', '교통', '쇼핑', '문화', '기타'],
    datasets: [
      {
        data: [350000, 150000, 100000, 129000, 100000], 
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
        data: [1000000, 100000, 100000], 
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
    : { 
        title: '총 자산', 
        amount: summary.totalAsset, 
        categories: assetData.labels.length, 
        color: 'text-green-600', 
        data: assetData 
      };

  // 도넛 차트 옵션 설정
  const chartOptions = {
    responsive: true,
    cutout: '70%', 
    // 💥💥 중앙 텍스트가 차트의 툴팁/범례에 의해 가려지는 것을 방지하기 위해 title을 강제 숨김 💥💥
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    return `${label}: ${value.toLocaleString()}원`;
                }
            }
        }
    },
    // 애니메이션 비활성화 (선택 사항)
    animation: false,
  };


  return (
    <MobileLayout>
      <div className="pb-20 pt-4 px-4"> 
        {/* === 1. 상단 정보 (월 선택) === */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">대시보드</h1>
          {/* 💥💥 월 선택 버튼: 현재 월 표시 및 클릭 시 모달 열기 💥💥 */}
          <button 
            onClick={() => setIsMonthModalOpen(true)}
            className="text-base font-semibold text-indigo-600 flex items-center hover:text-indigo-800 transition"
          >
            {selectedMonth} 
            <span className="ml-1 text-lg">⬇️</span>
          </button>
        </header>

        {/* === 2. This Month 요약 카드 === */}
        <div className="bg-white p-4 rounded-xl shadow-lg border-b-2 mb-8">
          <h2 className="text-base font-semibold text-gray-700 mb-4">이번 달</h2>
          
          {/* 자산/수입/지출 요약 라인 */}
          <SummaryLine label="총 자산" amount={summary.totalAsset} color="bg-green-500" />
          <SummaryLine label="총 지출" amount={summary.currentExpense} color="bg-orange-500" />
          <SummaryLine label="총 수입" amount={summary.currentEarn} color="bg-indigo-500" />
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
            
            <div className="w-64 h-64"> 
                <Doughnut data={chartConfig.data} options={chartOptions} />
            </div>
            
            {/* 💥💥 차트 중앙 텍스트 오버레이 (겹침 문제 해결) 💥💥 */}
            <div className="absolute text-center pointer-events-none">
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
             
             {chartConfig.data.labels?.map((label, index) => (
                <div key={label} className="flex justify-between p-3 bg-white border rounded-lg shadow-sm">
                    <div className="flex items-center">
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

      {/* 💥💥 2. 월 선택 모달 컴포넌트 추가 💥💥 */}
      <MonthPickerModal 
          isOpen={isMonthModalOpen} 
          onClose={() => setIsMonthModalOpen(false)}
          onMonthSelect={setSelectedMonth}
      />
    </MobileLayout>
  );
};

export default DashboardPage;

// --- 하위 컴포넌트 정의 (이전과 동일) ---

const SummaryLine = ({ label, amount, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-sm text-gray-700">
      <span>{label}</span>
      <span className="font-semibold">{amount.toLocaleString()}원</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 mt-0.5">
      <div 
        className={`${color} h-2 rounded-full`} 
        style={{ width: `${Math.min(amount / 1500000 * 100, 100)}%` }}
      ></div>
    </div>
  </div>
);

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


// 💥💥 3. 월 선택 모달 컴포넌트 (임시 구현) 💥💥
const MonthPickerModal = ({ isOpen, onClose, onMonthSelect }) => {
    if (!isOpen) return null;

    const availableMonths = [
        '2025년 9월', '2025년 8월', '2025년 7월', '2025년 6월'
    ];

    const handleSelect = (month) => {
        onMonthSelect(month);
        onClose();
    };

    return (
        // 모달 배경
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* 모달 내용 컨테이너 (모바일에 맞게 작게 설정) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-sm">
                <h3 className="text-lg font-bold mb-4">월 선택</h3>
                <div className="space-y-3">
                    {availableMonths.map(month => (
                        <button
                            key={month}
                            onClick={() => handleSelect(month)}
                            className="w-full py-2 text-center text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition"
                        >
                            {month}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={onClose}
                    className="w-full mt-4 py-2 text-gray-500 border rounded-lg hover:bg-gray-50 transition"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};      