// src/pages/LedgerPage.jsx
import React, { useState } from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';
import LedgerEntryModal from '../components/ledger/LedgerEntryModal'; 


const LedgerPage = () => {
  const [activeTab, setActiveTab] = useState('calendar'); 
  const [selectedMonth, setSelectedMonth] = useState('5월'); 
  
  // 1. 선택된 날짜 상태 추가
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
  
  // 모달에 전달할 날짜 객체를 상태로 관리
  const [modalDate, setModalDate] = useState(null); 


  // 임시 데이터 
  const ledgerData = [
    { date: '2025-05-01', income: 150000, expense: 50000, memo: '월급' },
    { date: '2025-05-09', income: 0, expense: 34500, memo: '식비 - 점심' },
    { date: '2025-05-27', income: 200000, expense: 0, memo: '부수입' },
    { date: '2025-05-09', income: 0, expense: 15000, memo: '교통비' },
  ];
  
  // 그래프 버튼 핸들러
  const goToDashboard = () => {
    alert('대시보드(그래프) 페이지로 이동합니다.');
  };

  const handleEntrySubmit = (data) => {
      console.log('가계부 내역 입력 완료:', data);
      setModalDate(null);
  };
  
  // 달력 날짜 선택 핸들러: 날짜 선택 및 해당 날짜로 모달 열기
  const handleDayClick = (day) => {
      setSelectedDay(day);
      const dateToOpen = new Date(2025, 4, day); 
      setModalDate(dateToOpen); 
  };
  
  // 내역 추가 플로팅 버튼 핸들러: 오늘 날짜로 모달 열기
  const handleOpenModal = () => {
      setModalDate(new Date()); 
  };
  
  // 모달 닫기 핸들러
  const handleCloseModal = () => {
      setModalDate(null); 
  };

  
  // 선택된 날짜의 상세 내역 필터링
  const selectedDayEntries = ledgerData.filter(entry => 
      new Date(entry.date).getMonth() === 4 && new Date(entry.date).getDate() === selectedDay
  );


  // --- 달력 렌더링 함수 ---
  const renderCalendar = () => {
      const days = Array.from({ length: 30 }, (_, i) => i + 1);
      
      return (
          <div className="mt-6">
              {/* 엑셀 항목: 수입/지출 내용 표시 (요약) */}
              <div className="flex justify-between text-sm font-semibold mb-4 border-b pb-2">
                  <span className="text-blue-500">수입: 2,003,000원</span>
                  <span className="text-red-500">지출: 465,020원</span>
              </div>

              {/* 달력 그리드 */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                      <div key={day} className="font-bold text-gray-500">{day}</div>
                  ))}
                  {/* 5월 1일이 목요일이라고 가정하고 빈칸 3개 채우기 */}
                  {Array.from({ length: 3 }, (_, i) => <div key={`empty-${i}`}></div>)} 

                  {days.map(day => {
                      const dayData = ledgerData.filter(d => new Date(d.date).getDate() === day);
                      const isSelected = day === selectedDay;
                      const isToday = day === new Date().getDate();
                      
                      const totalIncome = dayData.reduce((sum, d) => sum + d.income, 0);
                      const totalExpense = dayData.reduce((sum, d) => sum + d.expense, 0);

                      return (
                          <div 
                              key={day} 
                              onClick={() => handleDayClick(day)} 
                              className={`p-1.5 rounded-lg cursor-pointer transition
                                  ${isSelected 
                                      ? 'bg-indigo-600 text-white shadow-md' 
                                      : isToday 
                                      ? 'bg-indigo-100 font-bold' 
                                      : 'hover:bg-gray-100'
                                  }
                              `}
                          >
                              <div className="text-sm">{day}</div>
                              {(totalIncome > 0 || totalExpense > 0) && (
                                  <div className="mt-1">
                                      {totalIncome > 0 && <p className={`text-xs leading-none ${isSelected ? 'text-white' : 'text-blue-500'}`}>+{totalIncome.toLocaleString()}</p>}
                                      {totalExpense > 0 && <p className={`text-xs leading-none ${isSelected ? 'text-white' : 'text-red-500'}`}>-{totalExpense.toLocaleString()}</p>}
                                  </div>
                              )}
                          </div>
                      );
                  })}
              </div>
          </div>
      );
  };
  
  // --- 상세 내역 렌더링 함수 ---
  const renderDayEntries = () => (
      <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
              {selectedMonth} {selectedDay}일 상세 내역
          </h2>
          {selectedDayEntries.length > 0 ? (
              <div className="space-y-3">
                  {selectedDayEntries.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                          <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-800">
                                  {entry.memo || '내용 없음'}
                              </span>
                              <span className="text-xs text-gray-500">
                                  {entry.income > 0 ? '수입' : entry.expense > 0 ? '지출' : '이체'}
                              </span>
                          </div>
                          <span className={`font-semibold text-lg ${entry.income > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                              {(entry.income || entry.expense).toLocaleString()}원
                          </span>
                          {/* 엑셀 항목: 편집 버튼 */}
                          <button className="text-sm text-gray-400 hover:text-gray-600">
                            ⚙️
                          </button>
                      </div>
                  ))}
              </div>
          ) : (
              <p className="text-gray-500 py-10 text-center">선택된 날짜에는 내역이 없습니다.</p>
          )}
      </div>
  );


  return (
    <MobileLayout>
      <div className="pb-20 pt-4 px-4">
        {/* 상단 월 선택 및 탭 */}
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">가계부</h1>
            <button className="text-base font-semibold text-indigo-600 flex items-center">
                {selectedMonth} ⬇️
            </button>
        </header>

        {/* 탭 영역 (달력, 통계, 카드별) */}
        <div className="flex space-x-6 border-b pb-2 mb-4">
            <TabButton label="달력" isActive={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
            <TabButton label="통계" isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
            <TabButton label="카드별" isActive={activeTab === 'card'} onClick={() => setActiveTab('card')} />
        </div>

        {/* 컨텐츠 영역 */}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'stats' && <div className="py-10 text-center text-gray-500">통계 차트 영역 (구현 예정)</div>}
        {activeTab === 'card' && <div className="py-10 text-center text-gray-500">카드/현금별 내역 영역 (구현 예정)</div>}

        {/* 선택된 날짜의 상세 내역 */}
        {activeTab === 'calendar' && renderDayEntries()}


        {/* 💥💥 그래프 버튼 (오른쪽 상단 고정) 💥💥 */}
        <button 
          onClick={goToDashboard} 
          className="fixed top-4 right-4 text-sm font-semibold text-gray-500 hover:text-indigo-600 p-2 rounded-full bg-white shadow-md z-10"
        >
          📈
        </button>
      </div>
      
      {/* 하단 내역 추가 버튼 (플로팅 버튼) */}
      <button 
          onClick={handleOpenModal} 
          className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 rounded-full text-white text-3xl shadow-xl hover:bg-indigo-700 transition duration-150 z-20"
      >
          +
      </button>

      {/* 하단 내비게이션 바 */}
      <BottomNavbar />
      
      {/* 가계부 내역 추가 모달 (modalDate 상태에 따라 렌더링) */}
      {modalDate && (
          <LedgerEntryModal 
              isOpen={!!modalDate} 
              onClose={handleCloseModal} 
              onSubmit={handleEntrySubmit}
              initialDate={modalDate} 
          />
      )}
    </MobileLayout>
  );
};

export default LedgerPage;

// --- 하위 컴포넌트 정의 (TabButton) ---
const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`text-base font-semibold ${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
    >
        {label}
    </button>
);