// src/pages/LedgerPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';
import LedgerEntryModal from '../components/ledger/LedgerEntryModal'; 
import { IoAdd } from 'react-icons/io5'; // 아이콘 임포트

const LedgerPage = () => {
    const navigate = useNavigate();
    
    // 💥 오류 해결: 월 상태와 핸들러를 정의합니다. 💥
    const [selectedMonth, setSelectedMonth] = useState('5월'); 
    const [selectedDay, setSelectedDay] = useState(26); // 현재 화면에 보이는 26일로 초기값 변경
    
    const [ledgerEntries, setLedgerEntries] = useState([
        { date: '2025-05-01', income: 150000, expense: 50000, memo: '월급' },
        { date: '2025-05-08', income: 0, expense: 49500, memo: '온라인 쇼핑' },
        { date: '2025-05-27', income: 200000, expense: 0, memo: '추가 수입' },
        { date: '2025-05-27', income: 0, expense: 15000, memo: '커피' },
        { date: '2025-05-09', income: 0, expense: 49500, memo: '여행 준비' }, 
        { date: '2025-05-09', income: 0, expense: 15000, memo: '교통비' },
        { date: '2025-05-26', income: 0, expense: 3000, memo: '간식' }, // 26일 데이터 추가
    ]);
    const [modalDate, setModalDate] = useState(null);
    const [activeTab, setActiveTab] = useState('달력'); 

    // ----------------------------------------------------
    // 💥 월 변경 핸들러: select 드롭다운에서 사용 💥
    // ----------------------------------------------------
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setSelectedDay(1); // 월 변경 시 1일로 초기화 (UX 개선)
    };
    
    // ----------------------------------------------------
    // 달력 날짜 클릭 핸들러
    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    // 플로팅 + 버튼 클릭 핸들러 (선택된 날짜로 모달 열기)
    const handleOpenModal = () => {
        const monthNumber = parseInt(selectedMonth.replace('월', '')) - 1;
        const dateToOpen = new Date(new Date().getFullYear(), monthNumber, selectedDay); 
        setModalDate(dateToOpen);
    };

    const handleCloseModal = () => {
        setModalDate(null);
    };

    // 그래프 버튼 핸들러
    const goToDashboard = () => {
        navigate('/dashboard'); 
    };

    // 저장 로직: 상태에 새 내역 추가
    const handleEntrySubmit = (data) => {
        const amount = parseFloat(data.amount) || 0;
        const year = data.selectedDate.getFullYear();
        const month = String(data.selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(data.selectedDate.getDate()).padStart(2, '0');
        
        const newEntry = {
            date: `${year}-${month}-${day}`, 
            income: data.type === '수입' ? amount : 0,
            expense: data.type === '지출' ? amount : 0,
            memo: data.memo,
            type: data.type, 
            category: data.category,
            payment: data.payment, 
        };

        setLedgerEntries(prev => [...prev, newEntry]); 
        handleCloseModal();
    };

    // --- 달력 데이터 계산 로직 ---
    const getMonthInfo = useMemo(() => {
        const monthIndex = parseInt(selectedMonth.replace('월', '')) - 1;
        const currentYear = new Date().getFullYear();
        const firstDayOfMonth = new Date(currentYear, monthIndex, 1).getDay();
        const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
        return { firstDayOfMonth, daysInMonth, monthIndex };
    }, [selectedMonth]);

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

    // 해당 월의 총 수입/지출 계산
    const monthlySummary = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startOfMonth = new Date(currentYear, monthIndex, 1);
        const endOfMonth = new Date(currentYear, monthIndex + 1, 0);

        return ledgerEntries.reduce((acc, entry) => {
            const entryDate = new Date(entry.date);
            if (entryDate >= startOfMonth && entryDate <= endOfMonth) {
                acc.income += entry.income;
                acc.expense += entry.expense;
            }
            return acc;
        }, { income: 0, expense: 0 });
    }, [ledgerEntries, monthIndex]);

    // 선택된 날짜의 상세 내역 필터링
    const selectedDayEntries = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const targetDateString = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        
        return ledgerEntries
            .filter(entry => entry.date === targetDateString)
            .sort((a, b) => (a.expense > 0 ? 1 : -1));
    }, [ledgerEntries, selectedDay, monthIndex]);
    
    const formatCurrency = (amount) => {
        return amount.toLocaleString('ko-KR');
    };

    // --- 달력 렌더링 함수 ---
    const renderCalendar = () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const todayString = `${currentYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        return (
            <div className="grid grid-cols-7 text-center text-sm gap-y-2">
                {/* 요일 */}
                {['일', '월', '화', '수', '목', '금', '토'].map((dayName, index) => (
                    <div key={dayName} className={`font-bold py-2 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'}`}>
                        {dayName}
                    </div>
                ))}

                {/* 날짜 */}
                {days.map((day, index) => {
                    const isToday = day && `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` === todayString;
                    const isSelected = day === selectedDay;
                    
                    const dayData = ledgerEntries.filter(d => {
                        const dDate = new Date(d.date);
                        return dDate.getDate() === day && dDate.getMonth() === monthIndex;
                    });
                    
                    const dayIncome = dayData.reduce((sum, d) => sum + d.income, 0);
                    const dayExpense = dayData.reduce((sum, d) => sum + d.expense, 0);

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
                            
                            {/* 수입 표시 */}
                            {dayIncome > 0 && (
                                <span className="text-xs text-blue-600 absolute bottom-4 whitespace-nowrap">
                                    +{formatCurrency(dayIncome)}
                                </span>
                            )}
                            {/* 지출 표시 */}
                            {dayExpense > 0 && (
                                <span className="text-xs text-red-500 absolute bottom-1 whitespace-nowrap">
                                    -{formatCurrency(dayExpense)}
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

    // --- 상세 내역 렌더링 함수 ---
    const renderDayEntries = () => (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">{selectedMonth} {selectedDay}일 상세 내역</h3>
            {selectedDayEntries.length > 0 ? (
                <div className="space-y-3">
                    {selectedDayEntries.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-800">{entry.memo || '내용 없음'}</span>
                                <span className="text-xs text-gray-500">{entry.category || entry.type} ({entry.payment || '없음'})</span>
                            </div>
                            <span className={`font-semibold text-lg ${entry.income > 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                {entry.income > 0 ? `+${formatCurrency(entry.income)}원` : `-${formatCurrency(entry.expense)}원`}
                            </span>
                            <button className="text-sm text-gray-400 hover:text-gray-600">⚙️</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10">선택된 날짜에는 내역이 없습니다.</p>
            )}
        </div>
    );


    return (
        <MobileLayout activeNav="ledger">
            <div className="p-4 bg-white min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800">가계부</h1>
                    {/* 월 선택 드롭다운 */}
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange} // 👈 핸들러 연결
                        className="text-lg font-bold text-gray-800 focus:outline-none"
                    >
                        {['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'].map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                {/* 수입/지출 요약 */}
                <div className="flex justify-between mb-4 border-b pb-4">
                    <div className="text-left">
                        <span className="text-sm font-semibold text-gray-600">수입:</span>
                        <p className="text-lg font-bold text-blue-600">{formatCurrency(monthlySummary.income)}원</p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm font-semibold text-gray-600">지출:</span>
                        <p className="text-lg font-bold text-red-500">{formatCurrency(monthlySummary.expense)}원</p>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <div className="flex mb-6 text-center border-b">
                    {['달력', '통계', '카드별'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 font-semibold ${tab === activeTab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 달력 뷰 */}
                {activeTab === '달력' && renderCalendar()}

                {/* 선택된 날짜 상세 내역 */}
                {activeTab === '달력' && renderDayEntries()}

                {/* 💥💥 [요청 1] 그래프 버튼 (오른쪽 상단 고정) 💥💥 */}
                <button 
                  onClick={goToDashboard} 
                  className="fixed top-4 right-4 text-sm font-semibold text-gray-500 hover:text-indigo-600 p-2 rounded-full bg-white shadow-md z-10"
                >
                  📈 Dashboard
                </button>
            </div>

            {/* Floating Action Button for Adding Entry */}
            <button
                onClick={handleOpenModal}
                className="fixed bottom-20 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition z-20"
            >
                <IoAdd size={24} />
            </button>

            {/* 내역 입력 모달 */}
            {modalDate && (
                <LedgerEntryModal
                    initialDate={modalDate}
                    onSubmit={handleEntrySubmit}
                    onClose={handleCloseModal}
                />
            )}
        </MobileLayout>
    );
};

export default LedgerPage;  