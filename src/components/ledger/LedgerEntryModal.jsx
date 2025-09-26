// src/components/ledger/LedgerEntryModal.jsx

import React, { useState, useEffect } from 'react';
// 💥 IoRemoveCircleOutline 만 사용하고 나머지는 제거 💥
import { IoCloseOutline, IoRemoveCircleOutline } from 'react-icons/io5'; 
// (다른 아이콘을 사용하지 않았으므로, IoCloseOutline와 IoRemoveCircleOutline만 남깁니다.) 

// ... (나머지 코드 유지)

// ----------------------------------------------------
// [1번 요청] 그래프 버튼 위치 수정: Link 사용 제거, 모달에서는 삭제
// [2번 요청] 카테고리 정의 (수입/이체 복원)
// ----------------------------------------------------
const CATEGORIES = {
    // 💥 지출 카테고리
    지출: [
        { label: '식비', icon: '🍽️' },
        { label: '쇼핑', icon: '🛍️' },
        { label: '교통', icon: '🚌' },
        { label: '숙박', icon: '🏨' },
        { label: '문화/여가', icon: '🎬' },
        { label: '생활용품', icon: '🏠' },
        { label: '기타', icon: '⚙️' },
    ],
    // 💥 수입 카테고리 (복원)
    수입: [
        { label: '월급', icon: '💰' },
        { label: '투자수익', icon: '📈' },
        { label: '용돈', icon: '🎁' },
        { label: '부수입', icon: '💼' },
    ],
    // 💥 이체 카테고리 (복원)
    이체: [
        { label: '내 계좌 이체', icon: '🔁' },
    ],
};

// 날짜 포맷팅 함수
const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    return `${year}.${month}.${day} ${ampm} ${hours}:${minutes}`;
};

// InfoRow 컴포넌트
const InfoRow = ({ label, value, children }) => (
    <div className="flex justify-between items-center py-4 border-b">
        <span className="text-gray-500">{label}</span>
        <div className="flex items-center">
            <span className="font-semibold">{value}</span>
            {children}
        </div>
    </div>
);

// 날짜 편집 버튼 (3번 요청)
const DateEditButton = ({ onClick }) => (
    <button 
        onClick={onClick}
        className="ml-2 text-sm text-indigo-500 hover:text-indigo-600">
        편집
    </button>
);

const LedgerEntryModal = ({ initialDate, onSubmit, onClose }) => {
    const [type, setType] = useState('지출');
    const [amount, setAmount] = useState('');
    const [selectedDate] = useState(initialDate || new Date());
    const [formData, setFormData] = useState({
        category: CATEGORIES['지출'][0].label,
        payment: '카드', // 👈 [2번 요청] 초기값 설정
        memo: '', 
    });

    // Type이 변경될 때 카테고리와 결제수단 초기화
    useEffect(() => {
        const defaultCategory = CATEGORIES[type] ? CATEGORIES[type][0].label : '미분류';
        setFormData(prev => ({ 
            ...prev, 
            category: defaultCategory,
            // 지출에서 다른 타입으로 변경 시 결제 수단 초기화 (null)
            payment: type === '지출' ? prev.payment : '', 
        }));
    }, [type]);
    // ----------------------------------------------------
    // [2번 요청] 결제 수단 선택 핸들러
    // ----------------------------------------------------
    const handlePaymentSelect = (paymentType) => {
        setFormData(prev => ({ ...prev, payment: paymentType }));
    };

    // [3번 요청] 날짜 편집 기능 (임시)
    const handleDateEditClick = () => {
        alert('날짜/시간 선택 팝업창 (구현 예정)');
    }
    
    // 키패드 입력 핸들러 (유지)
    const handleKeypadClick = (key) => {
        let newAmount = amount;

        if (key === 'DEL') {
            newAmount = amount.slice(0, -1);
        } else if (key === '+' || key === '-' || key === 'x' || key === '÷' || key === '=') {
            return;
        } else if (key === ',000') {
            newAmount = amount + '000';
        } else {
            newAmount = amount + key;
        }

        if (newAmount.length > 15) {
            newAmount = amount;
        }

        setAmount(newAmount.replace(/[^0-9]/g, '')); // 숫자만 남기기
    };

    // [5번 요청] 제출 핸들러 (저장)
    const handleSubmit = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert('금액을 입력해주세요.');
            return;
        }
        if (type === '지출' && !formData.payment) { // 👈 [2번 요청] 지출일 때 결제 수단 필수 검사
             alert('지출 내역은 결제 수단을 선택해주세요.');
             return;
        }

        const dataToSubmit = {
            selectedDate: selectedDate,
            type: type,
            amount: parseFloat(amount),
            category: formData.category,
            memo: formData.memo,
            payment: formData.payment,
        };

        onSubmit(dataToSubmit); // LedgerPage로 데이터 전송
    };

    // 금액 포맷팅 (표시용)
    const displayAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // 키패드 배열
    const calculatorKeys = [
        ['1', '2', '3', { label: 'X', value: 'DEL', className: 'bg-gray-200' }],
        ['4', '5', '6', '+'],
        ['7', '8', '9', '-'],
        ['00', '0', ',000', '='],
    ];

    const Keypad = () => (
        <div className="grid grid-cols-4 w-full border-t">
            {calculatorKeys.flat().map((key, index) => {
                const keyLabel = typeof key === 'object' ? key.label : key;
                const keyValue = typeof key === 'object' ? key.value : key;
                const isOperator = ['+', '-', '='].includes(keyLabel);
                const isDelete = keyValue === 'DEL';
                
                return (
                    <button
                        key={index}
                        onClick={() => handleKeypadClick(keyValue)}
                        className={`flex items-center justify-center h-16 text-xl font-light transition 
                                    ${isOperator || isDelete ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-white hover:bg-gray-50'}`}
                    >
                        {keyLabel === 'X' ? <IoRemoveCircleOutline size={24} /> : keyLabel}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-white flex flex-col z-50">
            {/* 상단바 */}
            <header className="flex justify-between items-center p-4 border-b">
                <button onClick={onClose} className="text-gray-500 text-3xl font-bold">
                    ←
                </button>
                <h2 className="text-lg font-bold">내역 추가</h2>
                <button onClick={handleSubmit} className="text-indigo-600 font-semibold">
                    완료
                </button>
            </header>

            {/* 분류 탭 */}
            <div className="p-6 pb-2 flex space-x-2">
                {['지출', '수입', '이체'].map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-4 py-2 rounded-full font-semibold transition 
                                    ${type === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* 금액 영역 */}
            <div className="px-6 py-4 border-b">
                <p className="text-lg text-gray-500">금액</p>
                <div className="flex justify-between items-end">
                    <span className="text-4xl font-light text-gray-900">{displayAmount || '0'}</span>
                    <span className="text-xl font-semibold text-gray-700">원</span>
                </div>
            </div>

            {/* 스크롤 가능한 상세 입력 영역 */}
            <div className="flex-1 overflow-y-auto px-6 pt-4">
                
                {/* 카테고리 선택 */}
                <div className="mb-6 py-2 border-b">
                    <p className="text-gray-500 text-sm block mb-2">카테고리</p>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES[type] && CATEGORIES[type].map(cat => (
                            <button
                                key={cat.label}
                                onClick={() => setFormData(prev => ({...prev, category: cat.label}))}
                                className={`px-3 py-1 text-sm rounded-full transition 
                                            ${formData.category === cat.label 
                                                ? 'bg-indigo-500 text-white shadow-md' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 💥💥 결제 수단 영역 (지출일 때만 표시) 💥💥 */}
                {type === '지출' && (
                    <div className="mb-6 py-2 border-b">
                        <p className="text-gray-500 text-sm block mb-2">결제 수단</p>
                        <div className="flex space-x-3">
                            {['카드', '현금'].map(pType => (
                                <button
                                    key={pType}
                                    onClick={() => handlePaymentSelect(pType)}
                                    className={`px-4 py-1 text-sm rounded-full transition 
                                                ${formData.payment === pType 
                                                    ? 'bg-indigo-600 text-white shadow-md' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                >
                                    {pType}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* 날짜 입력 */}
                <InfoRow 
                    label="날짜" 
                    value={formatDate(selectedDate)}
                > 
                    <DateEditButton onClick={handleDateEditClick} />
                </InfoRow>

                {/* 내용/메모 입력 (4번 요청) */}
                <div className="pt-4 mb-8">
                    <label className="text-gray-500 text-xs block mb-1">메모 (선택)</label>
                    <input
                        type="text"
                        value={formData.memo}
                        onChange={(e) => setFormData(p => ({...p, memo: e.target.value}))}
                        placeholder="거래처 또는 메모 입력"
                        className="w-full focus:outline-none text-base border-b pb-1"
                    />
                </div>
            </div>

            {/* 하단 키패드 */}
            <div className="border-t">
                <Keypad />
            </div>
        </div>
    );
};

export default LedgerEntryModal;