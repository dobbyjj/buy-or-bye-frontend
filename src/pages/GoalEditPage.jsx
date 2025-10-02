import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';

const GoalEditPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'asset'; // asset, income, expense
    
    // 숫자 포맷팅 함수
    const formatNumber = (value) => {
        if (!value) return '';
        const numericValue = value.replace(/[^0-9]/g, '');
        return numericValue ? parseInt(numericValue).toLocaleString('ko-KR') : '';
    };
    
    const parseNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };
    
    const [assetGoals, setAssetGoals] = useState({
        부동산: '',
        대출: '',
        예금현금: '',
        기타자산: ''
    });

    const [incomeGoals, setIncomeGoals] = useState({
        월급: '',
        투자수익: '',
        용돈: '',
        기타부수입: ''
    });

    const [expenseGoals, setExpenseGoals] = useState({
        식비: '',
        쇼핑: '',
        교통: '',
        주거관리비: '',
        문화여가: '',
        생활용품: '',
        기타: ''
    });

    const getTitle = () => {
        switch(type) {
            case 'asset': return '나의 자산 목표치를 설정 해주세요';
            case 'income': return '나의 월 수입 목표치를 설정 해주세요';
            case 'expense': return '나의 월 지출 목표치를 설정 해주세요';
            default: return '목표치 입력';
        }
    };

    const handleSubmit = () => {
        // 목표치 저장 로직
        console.log('목표치 저장:', { type, assetGoals, incomeGoals, expenseGoals });
        navigate('/dashboard');
    };

    const renderAssetInputs = () => (
        <>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                    부동산 가액
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="보유 부동산의 현재 가치를 입력"
                        value={formatNumber(assetGoals.부동산)}
                        onChange={(e) => setAssetGoals({...assetGoals, 부동산: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                    대출 금액
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="주택 담보, 신용 대출 등 총액을 입력"
                        value={formatNumber(assetGoals.대출)}
                        onChange={(e) => setAssetGoals({...assetGoals, 대출: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                    단기 예금/현금
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="비상금 또는 단기 예금 금액을 입력"
                        value={formatNumber(assetGoals.예금현금)}
                        onChange={(e) => setAssetGoals({...assetGoals, 예금현금: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>
                    기타 금융자산(투자, 적금 등)
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="투자, 적금 등 기타 금융자산 금액을 입력"
                        value={formatNumber(assetGoals.기타자산)}
                        onChange={(e) => setAssetGoals({...assetGoals, 기타자산: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>
        </>
    );

    const renderIncomeInputs = () => (
        <>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    💰 월급
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="매월 받아오는 급여를 입력"
                        value={formatNumber(incomeGoals.월급)}
                        onChange={(e) => setIncomeGoals({...incomeGoals, 월급: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    📈 투자수익
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="부동산, 금융 등 투자 수익을 입력"
                        value={formatNumber(incomeGoals.투자수익)}
                        onChange={(e) => setIncomeGoals({...incomeGoals, 투자수익: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🎁 용돈
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="주기적 관련 지출 금액을 입력"
                        value={formatNumber(incomeGoals.용돈)}
                        onChange={(e) => setIncomeGoals({...incomeGoals, 용돈: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🏠 기타 부수입
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="기타 부수입 관련 지출 금액을 입력"
                        value={formatNumber(incomeGoals.기타부수입)}
                        onChange={(e) => setIncomeGoals({...incomeGoals, 기타부수입: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>
        </>
    );

    const renderExpenseInputs = () => (
        <>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🍽️ 식비
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="식비 관련 지출 금액을 입력"
                        value={formatNumber(expenseGoals.식비)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 식비: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🛍️ 쇼핑
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="쇼핑 관련 지출 금액을 입력"
                        value={formatNumber(expenseGoals.쇼핑)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 쇼핑: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🚗 교통
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="교통비 관련 지출 금액을 입력"
                        value={formatNumber(expenseGoals.교통)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 교통: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🏠 주거, 관리비
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="주거 및 관리비 관련 지출 금액을 입력"
                        value={formatNumber(expenseGoals.주거관리비)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 주거관리비: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    🎭 문화/여가
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="문화/여가 관련 지출 금액을 입력"
                        value={formatNumber(expenseGoals.문화여가)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 문화여가: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    💄 생활용품
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="생활용품 관련 지출 금액을 입력"
                        value={formatNumber(expenseGoals.생활용품)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 생활용품: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    ⚪ 기타
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="기타 지출 금액을 입력"
                        value={formatNumber(expenseGoals.기타)}
                        onChange={(e) => setExpenseGoals({...expenseGoals, 기타: parseNumber(e.target.value)})}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            backgroundColor: '#f9f9f9'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px'
                    }}>원</span>
                </div>
            </div>
        </>
    );

    const renderInputs = () => {
        switch(type) {
            case 'asset': return renderAssetInputs();
            case 'income': return renderIncomeInputs();
            case 'expense': return renderExpenseInputs();
            default: return null;
        }
    };

    const getButtonText = () => {
        switch(type) {
            case 'asset': return '저장';
            case 'income': return '저장';
            case 'expense': return '저장';
            default: return '저장';
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            background: "#f9f9f9", 
            display: "flex", 
            flexDirection: "column",
            paddingBottom: 80
        }}>
            <MobileLayout>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px'
                }}>
                    <h1 style={{ 
                        fontSize: "18px", 
                        fontWeight: 700, 
                        color: "#333", 
                        marginBottom: 32,
                        lineHeight: 1.4,
                        textAlign: 'center'
                    }}>
                        {getTitle()}
                    </h1>

                    <div style={{ marginBottom: 40 }}>
                        {renderInputs()}
                    </div>

                    <button
                        onClick={handleSubmit}
                        style={{
                            width: '100%',
                            padding: '16px 24px',
                            backgroundColor: '#5865F2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '16px'
                        }}
                    >
                        {getButtonText()}
                    </button>
                </div>
            </MobileLayout>
        </div>
    );
};

export default GoalEditPage;
