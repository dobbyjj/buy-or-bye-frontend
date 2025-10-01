import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CATEGORIES = {
    지출: [
        { label: '식비', icon: '🍽️' },
        { label: '쇼핑', icon: '🛍️' },
        { label: '교통', icon: '🚌' },
        { label: '주거,관리비', icon: '🏡' },
        { label: '문화/여가', icon: '🎬' },
        { label: '생활용품', icon: '🧴' },
        { label: '대출', icon: '🏦' },
        { label: '카드 대금 출금', icon: '💳' },
        { label: '부동산', icon: '🏠' },
        { label: '기타 금융자산', icon: '💹' },
        { label: '기타', icon: '⚙️' },
    ],
    수입: [
        { label: '월급', icon: '💰' },
        { label: '투자수익', icon: '📈' },
        { label: '용돈', icon: '🎁' },
        { label: '부수입', icon: '💼' },
        { label: '부동산', icon: '🏠' },
        { label: '기타 금융자산', icon: '💹' },
    ],
};

const LedgerEntryModal = ({ initialDate, editingEntry, onSubmit, onClose }) => {
    const [type, setType] = useState('지출');
    
    // 각 타입별로 별도의 상태 관리
    const [expenseData, setExpenseData] = useState({
        amount: '',
        category: '',
        payment: '',
        memo: ''
    });
    
    const [incomeData, setIncomeData] = useState({
        amount: '',
        category: '',
        memo: ''
    });
    
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    // 현재 타입에 따른 데이터 가져오기
    const getCurrentData = () => {
        switch (type) {
            case '지출': return expenseData;
            case '수입': return incomeData;
            default: return expenseData;
        }
    };

    // 현재 타입에 따른 데이터 업데이트
    const updateCurrentData = (field, value) => {
        switch (type) {
            case '지출':
                setExpenseData(prev => ({ ...prev, [field]: value }));
                break;
            case '수입':
                setIncomeData(prev => ({ ...prev, [field]: value }));
                break;
        }
    };

    useEffect(() => {
        if (editingEntry) {
            const entryType = editingEntry.income > 0 ? '수입' : '지출';
            setType(entryType);
            
            const amount = String(editingEntry.income || editingEntry.expense || 0);
            const category = editingEntry.category || '';
            const memo = editingEntry.memo || '';
            
            if (entryType === '지출') {
                setExpenseData({
                    amount,
                    category,
                    payment: editingEntry.payment || '',
                    memo
                });
            } else if (entryType === '수입') {
                setIncomeData({
                    amount,
                    category,
                    memo
                });
            }
            
            setSelectedDate(new Date(editingEntry.date));
        }
    }, [editingEntry]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentData = getCurrentData();
        
        const parsedAmount = parseInt(currentData.amount) || 0;
        const entryData = {
            selectedDate,
            amount: String(parsedAmount),
            category: currentData.category,
            payment: currentData.payment || '',
            memo: currentData.memo,
            type,
        };

        onSubmit(entryData);
    };



    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: 24,
                width: '90%',
                maxWidth: 768,
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>
                        <MdArrowBack />
                    </button>
                    <h2 style={{ margin: '0 auto', fontSize: 18, fontWeight: 700 }}>
                        {editingEntry ? '수정하기' : '수입, 지출 입력'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* 타입 선택 */}
                    <div style={{ display: 'flex', marginBottom: 16, gap: 8 }}>
                        {['지출', '수입'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                style={{
                                    flex: 1,
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: 20,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    background: type === t ? '#4B4BFF' : '#f0f0f0',
                                    color: type === t ? '#fff' : '#666'
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* 금액 입력 */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>금액</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={getCurrentData().amount ? parseInt(getCurrentData().amount.replace(/[^0-9]/g, '') || '0', 10).toLocaleString('ko-KR') : ''}
                                onChange={(e) => {
                                    // 숫자만 추출
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                    updateCurrentData('amount', numericValue);
                                }}
                                placeholder="금액을 입력하세요"
                                style={{
                                    width: '100%',
                                    padding: '12px 40px 12px 16px',
                                    border: '1px solid #ddd',
                                    borderRadius: 8,
                                    fontSize: 16,
                                    textAlign: 'right',
                                    background: '#fff',
                                    outline: 'none'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4B4BFF'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                            />
                            <span style={{
                                position: 'absolute',
                                right: 16,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: 16,
                                color: '#666'
                            }}>
                                원
                            </span>
                        </div>
                    </div>

                    {/* 카테고리 선택 */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>카테고리</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {CATEGORIES[type].map((cat) => (
                                <button
                                    key={cat.label}
                                    type="button"
                                    onClick={() => updateCurrentData('category', cat.label)}
                                    style={{
                                        padding: '8px 12px',
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 14,
                                        cursor: 'pointer',
                                        background: getCurrentData().category === cat.label ? '#4B4BFF' : '#f0f0f0',
                                        color: getCurrentData().category === cat.label ? '#fff' : '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4
                                    }}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 결제 수단 (지출일 때만) */}
                    {type === '지출' && (
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>결제 수단</label>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {['신용 카드', '현금(체크카드, 예금 등)'].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => updateCurrentData('payment', p)}
                                        style={{
                                            flex: 1,
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: 8,
                                            fontSize: 14,
                                            cursor: 'pointer',
                                            background: getCurrentData().payment === p ? '#4B4BFF' : '#f0f0f0',
                                            color: getCurrentData().payment === p ? '#fff' : '#666'
                                        }}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 날짜 선택 */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>날짜</label>
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: 16,
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#4B4BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    {/* 사용 내용 */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>사용 내용</label>
                        <input
                            type="text"
                            value={getCurrentData().memo}
                            onChange={(e) => updateCurrentData('memo', e.target.value)}
                            placeholder="사용 내용을 입력하세요"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: 16,
                                outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#4B4BFF'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>



                    {/* 제출 버튼 */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px 0',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: 16,
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: '#4B4BFF',
                            color: '#fff'
                        }}
                    >
                        {editingEntry ? '수정하기' : '저장하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LedgerEntryModal;