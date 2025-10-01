// src/data/resultData.js

// 1. 각 MBTI에 맞는 이미지를 import 합니다. (경로를 스크린샷에 맞게 수정했습니다)
import ENFJ from '../assets/ENFJ.png';
import ENFP from '../assets/ENFP.png';
import ENTJ from '../assets/ENTJ.png';
import ENTP from '../assets/ENTP.png';
import ESFJ from '../assets/ESFJ.png';
import ESFP from '../assets/ESFP.png';
import ESTJ from '../assets/ESTJ.png';
import ESTP from '../assets/ESTP.png';
import INFJ from '../assets/INFJ.png';
import INFP from '../assets/INFP.png';
import INTJ from '../assets/INTJ.png';
import INTP from '../assets/INTP.png';
import ISFJ from '../assets/ISFJ.png';
import ISFP from '../assets/ISFP.png';
import ISTJ from '../assets/ISTJ.png';
import ISTP from '../assets/ISTP.png';

// 2. mbtiResultData 객체의 image 속성에 위에서 import한 변수들을 연결합니다.
export const mbtiResultData = {
  ENFJ: {
    type: "ENFJ",
    title: "활동가형 소비",
    description: "활동적 모임·새 경험 속에서 감정적 교류, 소비도 사람 중심",
    image: ENFJ 
  },
  ENFP: {
    type: "ENFP",
    title: "스토리텔러형 소비",
    description: "즉흥적·새로움·브랜드 스토리에 끌려 감성적 소비",
    image: ENFP
  },
  ENTJ: {
    type: "ENTJ",
    title: "계획적 리더형 소비",
    description: "이벤트·외부 활동, 기능·스펙 중시, 계획적 소비",
    image: ENTJ
  },
  ENTP: {
    type: "ENTP",
    title: "호기심 많은 탐험가형 소비",
    description: "새 경험 추구, 즉흥적이지만 합리적 소비",
    image: ENTP
  },
  ESFJ: {
    type: "ESFJ",
    title: "사교적인 균형형 소비",
    description: "모임·이벤트 좋아함, 실용성과 감성 균형",
    image: ESFJ
  },
  ESFP: {
    type: "ESFP",
    title: "즉흥적 즐거움형 소비",
    description: "즉흥적 경험+가성비, 감성적 소비",
    image: ESFP
  },
  ESTJ: {
    type: "ESTJ",
    title: "현실 실천가형 소비",
    description: "이벤트·외부 활동, 가성비·기능·계획적 소비",
    image: ESTJ
  },
  ESTP: {
    type: "ESTP",
    title: "실용적 모험가형 소비",
    description: "즉흥적이지만 실용적, 가성비 중심",
    image: ESTP
  },
  INFJ: {
    type: "INFJ",
    title: "신념 있는 힐링형 소비",
    description: "혼자 취미·디지털, 새 경험 가치 중시, 감성적 계획 소비",
    image: INFJ
  },
  INFP: {
    type: "INFP",
    title: "개인 만족형 낭만 소비",
    description: "개인 만족, 브랜드 스토리·경험에 즉흥적·감성적 소비",
    image: INFP
  },
  INTJ: {
    type: "INTJ",
    title: "전략적 연구형 소비",
    description: "개인 취미·디지털, 기능·스펙 중시, 계획적 소비",
    image: INTJ
  },
  INTP: {
    type: "INTP",
    title: "분석적 탐구형 소비",
    description: "개인 만족, 합리적으로 새 경험 추구, 즉흥적 소비",
    image: INTP
  },
  ISFJ: {
    type: "ISFJ",
    title: "신뢰 기반 안정형 소비",
    description: "개인 만족, 실용·가성비 중시, 감성적 계획 소비",
    image: ISFJ
  },
  ISFP: {
    type: "ISFP",
    title: "예술적 즉흥형 소비",
    description: "개인 취향·즉흥적 경험, 감성적 소비",
    image: ISFP
  },
  ISTJ: {
    type: "ISTJ",
    title: "원칙 준수 계획형 소비",
    description: "개인 만족, 실용·가성비·스펙 중시, 계획적 소비",
    image: ISTJ
  },
  ISTP: {
    type: "ISTP",
    title: "합리적 실용주의 소비",
    description: "개인 만족, 합리적 사고, 즉흥적 소비",
    image: ISTP
  },
};