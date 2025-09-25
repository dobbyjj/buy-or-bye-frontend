// src/components/ledger/LedgerEntryModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ------------------------------------------------------------------
// 가계부 내역 추가 모달 (참고 이미지 기반 구현)
// ------------------------------------------------------------------
const LedgerEntryModal = ({ isOpen, onClose, onSubmit, initialDate }) => {
    const navigate = useNavigate(); 
    
    // 엑셀 항목: 구분 (지출 or 수입 or 이체)
    const [type, setType] = useState('지출'); 
    
    const [formData, setFormData] = useState({
        amount: 0,    // 금액 (숫자 형태로 저장, 초기값 0)
        category: '미분류', // 항목 분류
        payment: '카드', // 카드 or 현금 선택
        memo: '',      // 내용(선택)
    });

    // props로 전달받은 날짜 객체 사용
    const selectedDate = initialDate || new Date(); 

    if (!isOpen) return null;

    // 키패드 입력 핸들러
    const handleAmountChange = (key) => {
        let currentAmountStr = formData.amount.toString();
        
        if (key === 'C') { currentAmountStr = '0'; }
        else if (key === 'DEL') { 
            currentAmountStr = currentAmountStr.slice(0, -1) || '0'; 
        }
        else if (key === ',000') {
            currentAmountStr = (currentAmountStr.replace(/[^0-9]/g, '') || '0') + '000';
            currentAmountStr = parseInt(currentAmountStr).toString(); 
        }
        else if (!['+', '-', '=', '.'].includes(key)) {
            if (currentAmountStr === '0') {
                currentAmountStr = key;
            } else if (key !== '.' && key !== 'C' && key !== 'DEL') {
                currentAmountStr += key;
            }
            currentAmountStr = currentAmountStr.replace(/[^0-9]/g, ''); 
            currentAmountStr = parseInt(currentAmountStr).toString();
        }
        
        setFormData(prev => ({ ...prev, amount: currentAmountStr }));
    };

    const handleSubmit = () => {
        const finalAmount = parseFloat(formData.amount);
        if (finalAmount <= 0 || isNaN(finalAmount)) {
            alert('금액을 입력해주세요.');
            return;
        }
        onSubmit({ ...formData, type, date: selectedDate.toISOString() });
        onClose(); 
    };

    // --- 키패드 컴포넌트 ---
    // src/components/ledger/LedgerEntryModal.jsx (Keypad 함수 부분만 수정)

// ... (handleAmountChange 함수 유지)

    // --- 키패드 컴포넌트 ---
    const Keypad = () => {
        // 참고 이미지에 맞춘 키 배열 (1부터 시작, 0은 하단)
        const numKeys = [
            '1', '2', '3', 
            '4', '5', '6', 
            '7', '8', '9', 
            '0', '00', ',000', // 콤마 포함한 숫자열
        ];

        // 오른쪽 연산자 및 DEL 키
        const operatorKeys = [
            'DEL', // '⬅️' 아이콘으로 표시
            '+',
            '-',
            '=', // 임시로 '=' 대신 'x' '÷'를 넣어야 하지만, 일단 기존 연산자 유지
        ];

        // 키패드의 Grid 구성
        return (
            <div className="flex">
                {/* 왼쪽 3x4 숫자 그리드 */}
                <div className="grid grid-cols-3 gap-px bg-gray-300 w-3/4">
                    {numKeys.map(key => (
                        <button
                            key={key}
                            onClick={() => handleAmountChange(key)}
                            className="py-5 text-2xl font-semibold transition bg-white text-gray-800"
                        >
                            {key}
                        </button>
                    ))}
                </div>
                
                {/* 오른쪽 1열: 기능 버튼 (DEL 포함) */}
                <div className="grid grid-rows-4 gap-px bg-gray-300 w-1/4">
                    {/* DEL 버튼 (참고 이미지처럼 X 아이콘으로 표시) */}
                    <button
                        onClick={() => handleAmountChange('DEL')}
                        className="py-5 text-2xl font-semibold transition bg-gray-200 text-gray-800"
                    >
                        ❌
                    </button>
                    {/* 연산자 버튼들 */}
                    {operatorKeys.slice(1).map(key => (
                        <button
                            key={key}
                            onClick={() => handleAmountChange(key)}
                            className="py-5 text-2xl font-semibold transition bg-indigo-200 text-indigo-700"
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </div>
        );
    };
    
// ... (나머지 코드 유지)
    // --- 날짜 포매팅 ---
    const formatDate = (date) => {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric', month: '2-digit', day: '2-digit'
        }) + ' ' + date.toLocaleTimeString('ko-KR', {
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };
    
    // 금액을 콤마로 포매팅 (표시용)
    const displayAmount = formData.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return (
        <div className="fixed inset-0 bg-white flex flex-col z-50">
            {/* 상단 헤더: 뒤로가기 버튼과 완료 버튼 */}
            <header className="flex justify-between items-center p-4 border-b">
                <button onClick={onClose} className="text-gray-500 text-3xl font-bold">
                    ←
                </button>
                <h2 className="text-lg font-bold">내역 추가</h2>
                <button onClick={handleSubmit} className="text-indigo-600 font-bold">완료</button>
            </header>
            
            {/* === 1. 구분 탭 (지출, 수입, 이체) === */}
            <div className="flex justify-around px-4 pt-4 mb-4">
                {['지출', '수입', '이체'].map(t => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`px-6 py-2 rounded-xl text-base font-bold transition duration-200 
                                    ${type === t ? 'bg-green-500 text-white shadow-md' : 'text-gray-500 border border-gray-300'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* === 2. 입력 필드 영역 === */}
            <div className="flex-1 overflow-y-auto px-6">
                
                {/* 금액 */}
                <div className="mb-6 pb-2">
                    <p className="text-gray-500 text-sm block mb-1">금액</p>
                    <div className="flex justify-between items-end">
                         <span className={`text-4xl font-extrabold ${type === '지출' ? 'text-red-500' : 'text-blue-500'}`}>
                             {displayAmount}
                         </span>
                         <span className="text-lg text-gray-500">원</span>
                    </div>
                </div>

                {/* 상세 항목 입력 필드 */}
                <InfoRow label="카테고리" value={formData.category}>
                    <SelectButton />
                </InfoRow>
                
                <InfoRow label="결제 수단" value={formData.payment}>
                    <SelectButton />
                </InfoRow>
                
                {/* 날짜 */}
                <InfoRow label="날짜" value={formatDate(selectedDate)}> 
                    <DateEditButton /> 
                </InfoRow>
                
                {/* 내용(선택) */}
                <div className="pt-4 mb-8">
                    <label className="text-gray-500 text-xs block mb-1">내용 (선택)</label>
                    <input
                        type="text"
                        value={formData.memo}
                        onChange={(e) => setFormData(p => ({...p, memo: e.target.value}))}
                        placeholder="거래처 또는 메모 입력"
                        className="w-full focus:outline-none text-base border-b pb-1"
                    />
                </div>
            </div>

            {/* === 3. 하단 영역 (키패드) === */}
            <div className="border-t">
                {/* 💥💥 그래프 버튼 코드 삭제 완료 💥💥 */}
                <Keypad />
            </div>
        </div>
    );
};

// 모달 내부에서만 사용되는 간결한 정보 표시 컴포넌트 (InfoRow)
const InfoRow = ({ label, value, children }) => (
    <div className="flex justify-between items-center border-b py-3">
        <span className="text-gray-500 text-sm">{label}</span>
        <div className="flex items-center text-gray-700 font-medium">
            {value}
            {children}
        </div>
    </div>
);

// 날짜 편집 버튼 (임시)
const DateEditButton = () => (
    <button className="ml-2 text-sm text-indigo-500 hover:text-indigo-600">편집</button>
);

// 선택 버튼 (임시)
const SelectButton = () => (
    <button className="ml-2 text-indigo-500 font-semibold text-sm">선택</button>
);


export default LedgerEntryModal;