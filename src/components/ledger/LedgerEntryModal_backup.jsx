import React, { } from 'react';
import { MdArrowBack, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CATEGORIES = {
    지출: [
        { label: '식비', icon: '🍽️' },
        { label: '쇼핑', icon: '🛍️' },
        { label: '교통', icon: '🚌' },
        { label: '주거,관리비', icon: '🏡' },
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

// Rest of the component code would go here...
