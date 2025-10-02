import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../components/common/BottomNavbar';
import LedgerEntryModal from '../components/ledger/LedgerEntryModal';
import { IoAdd, IoClose } from 'react-icons/io5';
import { MdArrowBack, MdEdit } from 'react-icons/md'; // 좌측 화살표 아이콘, 편집 아이콘

const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const months = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
];



const LedgerPage = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('5월');
  const [selectedDay, setSelectedDay] = useState(26);
  const [ledgerEntries, setLedgerEntries] = useState([
    { date: '2025-05-01', income: 150000, expense: 50000, memo: '월급' },
    { date: '2025-05-08', income: 0, expense: 49500, memo: '온라인 쇼핑' },
    { date: '2025-05-27', income: 200000, expense: 0, memo: '추가 수입' },
    { date: '2025-05-27', income: 0, expense: 15000, memo: '커피' },
    { date: '2025-05-09', income: 0, expense: 49500, memo: '여행 준비' },
    { date: '2025-05-09', income: 0, expense: 15000, memo: '교통비' },
    { date: '2025-05-26', income: 0, expense: 3000, memo: '간식' },
  ]);
  const [modalDate, setModalDate] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 850);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopView(window.innerWidth > 850);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // 연도/월 선택 핸들러
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
    setSelectedDay(1);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setSelectedDay(1);
  };
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  const handleOpenModal = () => {
    const monthNumber = parseInt(selectedMonth.replace('월', '')) - 1;
    const dateToOpen = new Date(selectedYear, monthNumber, selectedDay);
    setModalDate(dateToOpen);
  };
  const handleCloseModal = () => {
    setModalDate(null);
    setEditingEntry(null);
  };
  
  const handleEditEntry = (entry, entryIndex) => {
    const entryDate = new Date(entry.date);
    setModalDate(entryDate);
    setEditingEntry({ ...entry, index: entryIndex });
  };


  const handleEntrySubmit = (data) => {
    // 음수 처리가 가능한 금액 파싱
    let amount = parseFloat(data.amount.replace(/[^-0-9.]/g, '') || '0');
    
    // 음수인 경우 처리
    if (data.isNegative) {
      amount = -Math.abs(amount);
    }

    // 날짜 칸에 시간 이하 삭제
    const year = data.selectedDate.getFullYear();
    const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(data.selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    const newEntry = {
      date: dateString,
      income: data.type === '수입' ? Math.abs(amount) : 0,
      expense: data.type === '지출' ? Math.abs(amount) : 0,
      asset: data.type === '자산' ? Math.abs(amount) : 0,
      memo: data.memo,
      type: data.type,
      category: data.category,
      payment: data.payment,
      isNegative: data.isNegative || false, // 음수 정보 저장

    };

    if (editingEntry) {
      // 편집 모드: 기존 항목 수정
      setLedgerEntries(prev => 
        prev.map((entry, index) => 
          index === editingEntry.index ? newEntry : entry
        )
      );
    } else {
      // 추가 모드: 새 항목 추가
      setLedgerEntries(prev => [...prev, newEntry]);
    }
    handleCloseModal();
  };

  const handleDelete = (entryToDelete) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      setLedgerEntries(prev => 
        prev.filter((entry, index) => index !== entryToDelete.index)
      );
      handleCloseModal();
    }
  };

  // 달력 정보
  const getMonthInfo = useMemo(() => {
    const monthIndex = parseInt(selectedMonth.replace('월', '')) - 1;
    const firstDayOfMonth = new Date(selectedYear, monthIndex, 1).getDay();
    const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
    return { firstDayOfMonth, daysInMonth, monthIndex };
  }, [selectedMonth, selectedYear]);
  const { firstDayOfMonth, daysInMonth, monthIndex } = getMonthInfo;
  const days = useMemo(() => {
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    return daysArray;
  }, [firstDayOfMonth, daysInMonth]);
  const monthlySummary = useMemo(() => {
    const startOfMonth = new Date(selectedYear, monthIndex, 1);
    const endOfMonth = new Date(selectedYear, monthIndex + 1, 0);
    return ledgerEntries.reduce((acc, entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate >= startOfMonth && entryDate <= endOfMonth) {
        acc.income += entry.income || 0;
        acc.expense += entry.expense || 0;
        acc.asset += entry.asset || 0;
      }
      return acc;
    }, { income: 0, expense: 0, asset: 0 });
  }, [ledgerEntries, monthIndex, selectedYear]);
  const selectedDayEntries = useMemo(() => {
    const targetDateString = `${selectedYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    return ledgerEntries
      .filter(entry => entry.date === targetDateString)
      .sort(a => (a.expense > 0 ? 1 : -1));
  }, [ledgerEntries, selectedDay, monthIndex, selectedYear]);
  const formatCurrency = (amount) => {
    return amount.toLocaleString('ko-KR');
  };

  // 달력 렌더링
  const renderCalendar = () => {
    const today = new Date();
    const todayString = `${selectedYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return (
      <div className="grid grid-cols-7 text-center text-sm gap-y-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((dayName, index) => (
          <div key={dayName} className={`font-bold py-2 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'}`}>
            {dayName}
          </div>
        ))}
        {days.map((day, index) => {
          const isToday = day && `${selectedYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` === todayString;
          const isSelected = day === selectedDay;
          const dayData = ledgerEntries.filter(d => {
            const dDate = new Date(d.date);
            return dDate.getDate() === day && dDate.getMonth() === monthIndex && dDate.getFullYear() === selectedYear;
          });
          const dayIncome = dayData.reduce((sum, d) => sum + (d.income || 0), 0);
          const dayExpense = dayData.reduce((sum, d) => sum + (d.expense || 0), 0);
          const dayAsset = dayData.reduce((sum, d) => sum + (d.asset || 0), 0);
          if (day === null) {
            return <div key={index} className="h-16"></div>;
          }
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-start h-16 cursor-pointer rounded-lg relative 
                          ${isSelected ? 'bg-indigo-100' : 'hover:bg-gray-50'}
                          ${isToday ? 'border-2 border-indigo-500' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <span className={`text-xs font-semibold ${index % 7 === 0 ? 'text-red-500' : index % 7 === 6 ? 'text-blue-500' : 'text-gray-800'}`}>
                {day}
              </span>
              {dayIncome > 0 && (
                <span className="text-xs text-blue-600 absolute top-4 whitespace-nowrap">
                  +{formatCurrency(dayIncome)}
                </span>
              )}
              {dayExpense > 0 && (
                <span className="text-xs text-red-500 absolute bottom-1 whitespace-nowrap">
                  -{formatCurrency(dayExpense)}
                </span>
              )}
              {dayAsset > 0 && (
                <span className="text-xs text-green-600 absolute bottom-4 whitespace-nowrap">
                  자산{formatCurrency(dayAsset)}
                </span>
              )}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // 상세 내역 렌더링
  const renderDayEntries = () => (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{selectedYear}년 {selectedMonth} {selectedDay}일 상세 내역</h3>
      {selectedDayEntries.length > 0 ? (
        <div className="space-y-3">
          {selectedDayEntries.map((entry, dayIndex) => {
            // 전체 ledgerEntries에서 해당 항목의 실제 인덱스 찾기
            const realIndex = ledgerEntries.findIndex(ledgerEntry => 
              ledgerEntry.date === entry.date && 
              ledgerEntry.memo === entry.memo && 
              ledgerEntry.income === entry.income && 
              ledgerEntry.expense === entry.expense
            );
            
            return (
              <div key={dayIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{entry.memo || '내용 없음'}</span>
                  <span className="text-xs text-gray-500">
                    {entry.category || entry.type} ({entry.payment || '없음'})
                  </span>
                </div>
                <span className={`font-semibold text-lg ${
                  entry.income > 0 ? 'text-blue-600' : 
                  entry.expense > 0 ? 'text-red-500' : 
                  'text-green-600'
                }`}>
                  {entry.income > 0 ? `${entry.isNegative ? '-' : '+'}${formatCurrency(entry.income)}원` : 
                   entry.expense > 0 ? `${entry.isNegative ? '+' : '-'}${formatCurrency(entry.expense)}원` : 
                   `자산${entry.isNegative ? '-' : ''}${formatCurrency(entry.asset)}원`}
                </span>
                {/* 편집 아이콘으로 변경 */}
                <button 
                  className="text-sm text-gray-400 hover:text-indigo-600 transition-colors"
                  onClick={() => handleEditEntry(entry, realIndex)}
                >
                  <MdEdit size={20} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">선택된 날짜에는 내역이 없습니다.</p>
      )}
    </div>
  );

  // 고정비 수정 페이지 이동
  const handleFixedExpenseEdit = () => {
    navigate("/fixed-expense");
  };

  const fabContainerStyle = {
    position: 'fixed',
    bottom: 110,
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    right: isDesktopView ? 'calc(50% - 768px / 2 - 80px)' : 24,
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
        <h1 style={{ 
          textAlign: "center", 
          fontSize: "clamp(20px, 4vw, 28px)", 
          fontWeight: 700, 
          color: "#222", 
          marginBottom: 24 
        }}>
          가계부
        </h1>
        
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px #eee",
            padding: "24px 16px",
            marginBottom: 24,
            border: "1px solid #eee",
          }}
        >
          {/* 연도/월 선택 */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, border: "1px solid #ddd" }}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, border: "1px solid #ddd" }}
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          {/* 수입/지출 합계 */}
          <div style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>
            <span style={{ color: "#3B82F6", marginRight: 24 }}>수입: {formatCurrency(monthlySummary.income)}원</span>
            <span style={{ color: "#EF4444", marginRight: 24 }}>지출: {formatCurrency(monthlySummary.expense)}원</span>
            <span style={{ color: "#10B981" }}>자산: {formatCurrency(monthlySummary.asset)}원</span>
          </div>
          {/* 달력 */}
          {renderCalendar()}
          {/* 상세 내역 */}
          {renderDayEntries()}
        </div>
      </div>

      {/* FAB Speed Dial */}
      <div style={fabContainerStyle}>
        {/* Main FAB */}
        <button
          onClick={() => setIsFabOpen(!isFabOpen)}
          style={{
            width: 56,
            height: 56,
            background: isFabOpen ? '#6B7280' : '#4B4BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s',
            marginTop: 16,
          }}
        >
          {isFabOpen ? <IoClose size={32} /> : <IoAdd size={32} />}
        </button>

        {/* Speed Dial Options */}
        {isFabOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            {/* 고정비 지출 수정 버튼 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={() => { handleFixedExpenseEdit(); setIsFabOpen(false); }}
                style={{
                  width: 52,
                  height: 52,
                  background: '#10B981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="고정 수익/비용 입력"
              >
                <MdArrowBack size={28} />
              </button>
              <span style={{ fontSize: 14, color: '#333', fontWeight: 600, marginTop: 6, background: 'rgba(255,255,255,0.8)', padding: '2px 6px', borderRadius: 4 }}>고정수익/비용</span>
            </div>

            {/* 수입/지출 입력 버튼 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={() => { handleOpenModal(); setIsFabOpen(false); }}
                style={{
                  width: 52,
                  height: 52,
                  background: '#4B4BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="자산/수입/지출"
              >
                <MdEdit size={24} />
              </button>
              <span style={{ fontSize: 14, color: '#333', fontWeight: 600, marginTop: 6, background: 'rgba(255,255,255,0.8)', padding: '2px 6px', borderRadius: 4 }}>자산/수입/지출</span>
            </div>
          </div>
        )}
      </div>

      {modalDate && (
        <LedgerEntryModal
          initialDate={modalDate}
          editingEntry={editingEntry}
          onSubmit={handleEntrySubmit}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}

      
      <BottomNavbar active="ledger" />
    </div>
  );
};

export default LedgerPage;