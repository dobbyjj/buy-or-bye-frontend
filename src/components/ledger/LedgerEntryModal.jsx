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
        { label: '기타', icon: '⚙️' },
    ],
    수입: [
        { label: '월급', icon: '💰' },
        { label: '용돈', icon: '🎁' },
        { label: '투자(부동산, 금융 등)', icon: '📈' },
        { label: '기타 부수입', icon: '💼' },
    ],
    자산: [
        { label: '부동산', icon: '🏠' },
        { label: '대출', icon: '🏦' },
        { label: '예금/현금', icon: '💰' },
        { label: '기타 금융자산(투자, 적금 등)', icon: '📈' },
    ],
};

const LedgerEntryModal = ({ initialDate, editingEntry, onSubmit, onClose, onDelete }) => {
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
    
    const [assetData, setAssetData] = useState({
        amount: '',
        category: '',
        memo: ''
    });
    
    // 자산 관리를 위한 별도 상태
    const [assetBalances, setAssetBalances] = useState({
        '부동산': 0,
        '대출': 0,
        '예금/현금': 0,
        '기타 금융자산(투자, 적금 등)': 0
    });
    
    const [selectedAssetCategory, setSelectedAssetCategory] = useState('');
    const [assetAmount, setAssetAmount] = useState('');
    
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    
    // 현재 타입에 따른 데이터 가져오기
    const getCurrentData = () => {
        switch (type) {
            case '지출': return expenseData;
            case '수입': return incomeData;
            case '자산': return assetData;
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
            case '자산':
                setAssetData(prev => ({ ...prev, [field]: value }));
                break;
        }
    };

    useEffect(() => {
        if (editingEntry) {
            const entryType = editingEntry.income > 0 ? '수입' : 
                             editingEntry.expense > 0 ? '지출' : '자산';
            setType(entryType);
            
            const amount = String(editingEntry.income || editingEntry.expense || editingEntry.asset || 0);
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
            } else if (entryType === '자산') {
                setAssetData({
                    amount,
                    category,
                    memo
                });
            }
            
            setSelectedDate(new Date(editingEntry.date));
        }
    }, [editingEntry]);

    // Dashboard 자산 데이터와 동기화
    useEffect(() => {
        // Dashboard의 자산 데이터 가져오기 (localStorage나 Dashboard 데이터 소스)
        const getDashboardAssetData = () => {
            // Dashboard의 기본 자산 데이터 (실제 Dashboard에서 사용하는 값들)
            return {
                '부동산': 5000000,
                '대출': 2000000,
                '예금/현금': 3500000,
                '기타 금융자산(투자, 적금 등)': 2000000
            };
        };
        
        // localStorage에서 업데이트된 자산 데이터 확인
        const savedAssetBalances = localStorage.getItem('assetBalances');
        if (savedAssetBalances) {
            setAssetBalances(JSON.parse(savedAssetBalances));
        } else {
            // Dashboard 기본값으로 초기화
            const dashboardAssets = getDashboardAssetData();
            setAssetBalances(dashboardAssets);
            localStorage.setItem('assetBalances', JSON.stringify(dashboardAssets));
        }
    }, []);

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

    // 실시간 자산 반영 함수 (엔터키 또는 입력 시)
    const handleAssetChange = () => {
        if (!selectedAssetCategory || !assetAmount) return;
        
        const amount = parseInt(assetAmount.replace(/[^0-9]/g, '') || '0');
        const updatedBalances = {
            ...assetBalances,
            [selectedAssetCategory]: amount
        };
        
        // 실시간으로 현재 자산 현황에 반영
        setAssetBalances(updatedBalances);
    };

    // 자산 업데이트 함수 (Dashboard에 최종 반영)
    const handleAssetUpdate = (e) => {
        e.preventDefault();
        
        // 현재 assetBalances를 Dashboard 형식으로 변환하여 저장
        const dashboardAssetData = {
            ratio: {
                labels: ['부동산', '대출', '예금/현금', '기타 자산'], 
                datasets: [{
                    data: [
                        assetBalances['부동산'] || 0,
                        assetBalances['대출'] || 0,
                        assetBalances['예금/현금'] || 0,
                        assetBalances['기타 금융자산(투자, 적금 등)'] || 0
                    ],
                    backgroundColor: ['#EF4444', '#F59E0B', '#14B8A6', '#3B82F6'],
                    borderWidth: 0
                }]
            },
            comparison: {
                labels: ['나', '동 연령 평균', '재무 목표'], 
                datasets: [
                    { 
                        label: '부동산', 
                        data: [Math.round((assetBalances['부동산'] || 0) / 10000), 0, 600], 
                        backgroundColor: '#EF4444', 
                        stack: 'stack1' 
                    },
                    { 
                        label: '대출', 
                        data: [Math.round((assetBalances['대출'] || 0) / 10000), 0, 300], 
                        backgroundColor: '#F59E0B', 
                        stack: 'stack1' 
                    },
                    { 
                        label: '예금/현금', 
                        data: [Math.round((assetBalances['예금/현금'] || 0) / 10000), 0, 400], 
                        backgroundColor: '#14B8A6', 
                        stack: 'stack1' 
                    },
                    { 
                        label: '기타 자산', 
                        data: [Math.round((assetBalances['기타 금융자산(투자, 적금 등)'] || 0) / 10000), 0, 200], 
                        backgroundColor: '#3B82F6', 
                        stack: 'stack1' 
                    }
                ]
            }
        };
        
        // localStorage에 자산 데이터와 Dashboard 업데이트 정보 저장
        localStorage.setItem('assetBalances', JSON.stringify(assetBalances));
        localStorage.setItem('dashboardAssetUpdate', JSON.stringify(dashboardAssetData));
        
        alert('자산이 Dashboard에 반영되었습니다!');
        
        // 입력 필드 초기화
        setSelectedAssetCategory('');
        setAssetAmount('');
        
        // 자산 변경 내역을 기록
        const entryData = {
            selectedDate,
            amount: String(Object.values(assetBalances).reduce((sum, amount) => sum + amount, 0)),
            category: '자산 총합',
            payment: '',
            memo: `자산 업데이트 완료`,
            type: '자산',
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
                        자산, 수입, 지출 추가/수정
                    </h2>
                </div>

                {/* 타입 선택 */}
                <div style={{ display: 'flex', marginBottom: 16, gap: 8 }}>
                    {['지출', '수입', '자산'].map((t) => (
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

                {/* 자산 관리 UI */}
                {type === '자산' ? (
                    <form onSubmit={handleAssetUpdate}>
                        {/* 현재 자산 현황 표시 */}
                        <div style={{ marginBottom: 24 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>현재 자산 현황</h3>
                            <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16 }}>
                                {Object.entries(assetBalances).map(([category, amount]) => (
                                    <div key={category} style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginBottom: 8,
                                        padding: '8px 0'
                                    }}>
                                        <span style={{ fontSize: 14, fontWeight: 500 }}>{category}</span>
                                        <span style={{ fontSize: 14, color: '#10B981', fontWeight: 600 }}>
                                            {amount.toLocaleString('ko-KR')}원
                                        </span>
                                    </div>
                                ))}
                                <div style={{ 
                                    borderTop: '1px solid #e0e0e0', 
                                    paddingTop: 8, 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    fontWeight: 700
                                }}>
                                    <span>총 자산</span>
                                    <span style={{ color: '#10B981' }}>
                                        {Object.values(assetBalances).reduce((sum, amount) => sum + amount, 0).toLocaleString('ko-KR')}원
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 카테고리 선택 */}
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>수정할 카테고리</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                                {CATEGORIES.자산.map((cat) => (
                                    <button
                                        key={cat.label}
                                        type="button"
                                        onClick={() => {
                                            setSelectedAssetCategory(cat.label);
                                            setAssetAmount(assetBalances[cat.label]?.toString() || '0');
                                        }}
                                        style={{
                                            padding: '12px 16px',
                                            border: 'none',
                                            borderRadius: 8,
                                            fontSize: 14,
                                            cursor: 'pointer',
                                            background: selectedAssetCategory === cat.label ? '#4B4BFF' : '#f0f0f0',
                                            color: selectedAssetCategory === cat.label ? '#fff' : '#666',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8
                                        }}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 금액 입력 */}
                        {selectedAssetCategory && (
                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                                    변동 금액
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        value={assetAmount ? parseInt(assetAmount.replace(/[^0-9]/g, '') || '0').toLocaleString('ko-KR') : ''}
                                        onChange={(e) => {
                                            const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                            setAssetAmount(numericValue);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAssetChange();
                                            }
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
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px 0',
                                background: selectedAssetCategory && assetAmount ? '#4B4BFF' : '#ccc',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                fontSize: 16,
                                fontWeight: 600,
                                cursor: selectedAssetCategory && assetAmount ? 'pointer' : 'not-allowed'
                            }}
                            disabled={!selectedAssetCategory || !assetAmount}
                        >
                            자산 업데이트
                        </button>
                    </form>
                ) : (
                    // 기존 수입/지출 폼
                    <form onSubmit={handleSubmit}>

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
                    {editingEntry ? (
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                            <button
                                type="button"
                                onClick={() => onDelete && onDelete(editingEntry)}
                                style={{
                                    flex: 1,
                                    padding: '14px 0',
                                    border: 'none',
                                    borderRadius: 8,
                                    fontSize: 16,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    background: '#EF4444',
                                    color: '#fff'
                                }}
                            >
                                삭제하기
                            </button>
                            <button
                                type="submit"
                                style={{
                                    flex: 1,
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
                                수정하기
                            </button>
                        </div>
                    ) : (
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
                            저장하기
                        </button>
                    )}
                </form>
                )}
            </div>
        </div>
    );
};

export default LedgerEntryModal;