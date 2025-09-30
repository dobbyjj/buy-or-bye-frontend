import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';

const CATEGORIES = {
    지출: [
        { label: '식비', icon: '🍽️' },
        { label: '쇼핑', icon: '🛍️' },
        { label: '교통', icon: '🚌' },
        { label: '숙박', icon: '🏨' },
        { label: '문화/여가', icon: '🎬' },
        { label: '생활용품', icon: '🏠' },
        { label: '기타', icon: '⚙️' },
    ],
    수입: [
        { label: '월급', icon: '💰' },
        { label: '투자수익', icon: '📈' },
        { label: '용돈', icon: '🎁' },
        { label: '부수입', icon: '💼' },
    ],
    이체: [
        { label: '내 계좌 이체', icon: '🔁' },
        { label: '부동산', icon: '🏠' },
        { label: '대출', icon: '💳' },
        { label: '예금', icon: '🏦' },
        { label: '기타 금융자산', icon: '💹' },
        { label: '카드 대금 출금', icon: '💳' },
    ],
};

const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
};

const InfoRow = ({ label, value, children }) => (
    <div className="flex justify-between items-center py-4 border-b">
        <span className="text-gray-500">{label}</span>
        <div className="flex items-center">
            <span className="font-semibold">{value}</span>
            {children}
        </div>
    </div>
);

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
        payment: '카드',
        memo: '', 
    });

    useEffect(() => {
        const defaultCategory = CATEGORIES[type] ? CATEGORIES[type][0].label : '미분류';
        setFormData(prev => ({ 
            ...prev, 
            category: defaultCategory,
            payment: type === '지출' ? prev.payment : '', 
        }));
    }, [type]);

    const handlePaymentSelect = (paymentType) => {
        setFormData(prev => ({ ...prev, payment: paymentType }));
    };

    const handleDateEditClick = () => {
        alert('날짜/시간 선택 팝업창 (구현 예정)');
    }
    
    // 숫자 맨 앞에 0 입력 막기 (0은 첫 입력 불가, 이후에는 입력 가능)
    const handleKeypadClick = (key) => {
        let newAmount = amount;
        if (key === 'DEL') {
            newAmount = amount.slice(0, -1);
        } else if (key === '+' || key === '-' || key === 'x' || key === '÷' || key === '=') {
            return;
        } else if (key === '000') {
            if (amount === '' || amount === '0') return;
            newAmount = amount + '000';
        } else {
            if ((key === '0' || key === '00') && amount === '') return;
            newAmount = amount + key;
        }
        if (newAmount.length > 15) {
            newAmount = amount;
        }
        setAmount(newAmount.replace(/[^0-9]/g, ''));
    };

    const handleSubmit = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert('금액을 입력해주세요.');
            return;
        }
        if (type === '지출' && !formData.payment) {
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
        onSubmit(dataToSubmit);
    };

    const displayAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 0이 정상적으로 보이도록 키패드 배열 수정
    const calculatorKeys = [
        ['1', '2', '3', { label: <MdArrowBack size={24} />, value: 'DEL', className: 'bg-gray-200' }],
        ['4', '5', '6', '+'],
        ['7', '8', '9', '-'],
        ['00', '0', '000', '='],
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
                        {keyLabel}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div
            className="fixed inset-0 bg-white flex flex-col z-50"
            style={{
                maxWidth: 768,
                width: "100%",
                margin: "0 auto",
                height: "100vh",
                background: "#fff",
                paddingBottom: 80, // 네비게이션 바에 가리지 않도록 추가
            }}
        >
            {/* 상단바 */}
            <header className="flex justify-between items-center p-4 border-b">
                <button onClick={onClose} className="text-gray-500 text-3xl font-bold">
                    ←
                </button>
                <h2 className="text-lg font-bold">수입, 지출 입력</h2>
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
                
                <InfoRow 
                    label="날짜" 
                    value={formatDate(selectedDate)}
                > 
                    <DateEditButton onClick={handleDateEditClick} />
                </InfoRow>

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

            <div className="border-t">
                <Keypad />
            </div>
        </div>
    );
};

export default LedgerEntryModal;