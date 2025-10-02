// src/data/resultData.js

// 1. 각 MBTI에 맞는 이미지를 import 합니다. (모든 변수 정의)
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

/**
 * mbtiResultData 객체:
 * - title은 두 줄 표현을 위해 \n을 사용했습니다.
 * - description은 풍성하고 재밌게 재구성했습니다.
 * - *score 속성은 그래프 시각화를 위해 추가되었습니다. (오른쪽 성향의 우위 점수)
 */
export const mbtiResultData = {
  // E (Event) / N (Novelty) / F (Feel) / J (Judge) - ENFJ
  ENFJ: {
    type: "ENFJ",
    title: "✨공감형 가치 리더✨\n(Event-Novelty-Feel-Judge)",
    description: "내 소비는 곧 사람들과의 연결고리! 새로운 모임과 트렌디한 경험에 지출하는 '인맥 자본가'입니다. 감동적인 스토리에 쉽게 지갑을 열지만, 충동적인 소비는 용납 못 합니다. 가치 있는 일에 돈을 쓰고, 주변의 공감을 얻는 계획적인 플렉스를 즐깁니다.",
    image: ENFJ,
    E_score: 70, // E 우위
    N_score: 75, // N 우위
    F_score: 80, // F 우위
    P_score: 30, // J 우위 (오른쪽 성향 P가 낮음)
  },
  // E (Event) / N (Novelty) / F (Feel) / P (Play) - ENFP
  ENFP: {
    type: "ENFP",
    title: "🌈즉흥적 경험 메이커🌈\n(Event-Novelty-Feel-Play)",
    description: "내 사전에 '지루함'이란 없다! 새로운 경험과 재미가 최우선입니다. '와! 저건 무조건 해야 돼!' 싶으면 바로 결제하는 충동 만렙이지만, 남들 안 가본 힙한 곳에 먼저 발도장 찍어야 직성이 풀립니다. 감정적 만족도가 높으면 후회는 없습니다.",
    image: ENFP,
    E_score: 80, // E 우위
    N_score: 85, // N 우위
    F_score: 90, // F 우위
    P_score: 80, // P 우위
  },
  // E (Event) / N (Novelty) / T (Tech) / J (Judge) - ENTJ
  ENTJ: {
    type: "ENTJ",
    title: "📈전략적 효율 기획자📈\n(Event-Novelty-Tech-Judge)",
    description: "소비에도 전략이 필요합니다. '이 지출이 나에게 돌아올 이익은?'을 따져서 최고의 효율을 뽑아냅니다. 기능, 스펙, 브랜드의 미래 가치를 분석해 투자하죠. 낭비 없는 계획적인 하이엔드 소비를 지향하는 '성공 지향형' 소비자입니다.",
    image: ENTJ,
    E_score: 75, // E 우위
    N_score: 80, // N 우위
    F_score: 20, // F 우위 (T 우위)
    P_score: 25, // P 우위 (J 우위)
  },
  // E (Event) / N (Novelty) / T (Tech) / P (Play) - ENTP
  ENTP: {
    type: "ENTP",
    title: "🚀호기심 발동 분석가🚀\n(Event-Novelty-Tech-Play)",
    description: "'왜 안돼?'라는 호기심이 지갑을 열게 합니다. 새로운 기술과 트렌드에 빠삭하며, 일단 사고 '테스트' 해봐야 직성이 풀리는 똑똑한 충동 소비를 합니다. 합리성은 기본, 재미와 지적 만족까지 추구하는 '아이디어 뱅크형' 소비자입니다.",
    image: ENTP,
    E_score: 60, // E 우위
    N_score: 90, // N 우위
    F_score: 30, // F 우위 (T 우위)
    P_score: 70, // P 우위
  },
  // E (Event) / S (Saver) / F (Feel) / J (Judge) - ESFJ
  ESFJ: {
    type: "ESFJ",
    title: "🤝사교형 실속 구매자🤝\n(Event-Saver-Feel-Judge)",
    description: "'우리 모두의 행복'을 위해 지출하는 '모임 담당 총무'입니다. 실용적이고 좋은 제품을 찾아내서 나누는 것을 좋아하죠. 가성비와 따뜻한 감성 모두 중요하지만, 주변 사람들의 만족도를 높이는 계획적인 소비를 할 때 가장 뿌듯합니다.",
    image: ESFJ,
    E_score: 80, // E 우위
    N_score: 30, // N 우위 (S 우위)
    F_score: 75, // F 우위
    P_score: 20, // P 우위 (J 우위)
  },
  // E (Event) / S (Saver) / F (Feel) / P (Play) - ESFP
  ESFP: {
    type: "ESFP",
    title: "🎉가성비 체험 인싸🎉\n(Event-Saver-Feel-Play)",
    description: "소비의 목적은 오직 '지금, 즐겁게!'입니다. 트렌디한 장소에서 친구들과의 행복한 경험에 집중합니다. 비싸지 않아도 즉각적인 만족감이 최고! 가성비 좋은 실속템을 찾아내서 당장 지르는 '인생은 한 번'형 소비자입니다.",
    image: ESFP,
    E_score: 90, // E 우위
    N_score: 25, // N 우위 (S 우위)
    F_score: 85, // F 우위
    P_score: 90, // P 우위
  },
  // E (Event) / S (Saver) / T (Tech) / J (Judge) - ESTJ
  ESTJ: {
    type: "ESTJ",
    title: "🛠️현실 목표 달성가🛠️\n(Event-Saver-Tech-Judge)",
    description: "소비는 필요와 효율을 맞추는 일입니다. 낭비와 불필요한 지출을 극도로 싫어하며, 기능과 가격을 꼼꼼히 비교해 베스트셀러를 구매합니다. 한 번 사면 오래 쓰는 실용적인 내구재에 계획적으로 투자하는 '가성비 마스터'입니다.",
    image: ESTJ,
    E_score: 65, // E 우위
    N_score: 15, // N 우위 (S 우위)
    F_score: 15, // F 우위 (T 우위)
    P_score: 10, // P 우위 (J 우위)
  },
  // E (Event) / S (Saver) / T (Tech) / P (Play) - ESTP
  ESTP: {
    type: "ESTP",
    title: "⚡실용적 즉시 구매왕⚡\n(Event-Saver-Tech-Play)",
    description: "'일단 사서 써본다'가 모토입니다. 기능 대비 가격이 합리적이면 망설이지 않고 바로 결제합니다. 계획은 없지만, 문제 해결에 필요한 가장 효율적인 도구에 돈을 씁니다. 합리성과 실용성을 모두 잡는 '액션형 소비자'입니다.",
    image: ESTP,
    E_score: 75, // E 우위
    N_score: 20, // N 우위 (S 우위)
    F_score: 25, // F 우위 (T 우위)
    P_score: 75, // P 우위
  },
  // I (Indulgence) / N (Novelty) / F (Feel) / J (Judge) - INFJ
  INFJ: {
    type: "INFJ",
    title: "🕯️신념 기반 가치 투자자🕯️\n(Indulgence-Novelty-Feel-Judge)",
    description: "나만의 깊은 만족을 위해 소비합니다. 돈이 아깝지 않은 사회적 가치나 의미가 담긴 제품, 혹은 새로운 깨달음을 주는 디지털 콘텐츠에 집중합니다. 감성적인 끌림도 중요하지만, 구매 전 계획과 후회 없음을 중요시합니다.",
    image: INFJ,
    E_score: 30, // E 우위 (I 우위)
    N_score: 80, // N 우위
    F_score: 80, // F 우위
    P_score: 35, // P 우위 (J 우위)
  },
  // I (Indulgence) / N (Novelty) / F (Feel) / P (Play) - INFP
  INFP: {
    type: "INFP",
    title: "🌸개인 취향 낭만 소비🌸\n(Indulgence-Novelty-Feel-Play)",
    description: "브랜드의 스토리와 감성에 심장이 뛸 때 지갑이 열립니다. 나를 표현하고 개인적인 행복을 충족시키는 일에 돈을 아끼지 않습니다. 예산 관리보다 '이것이 나에게 주는 의미'가 훨씬 중요해, 낭만적인 즉흥 소비가 잦습니다.",
    image: INFP,
    E_score: 20, // E 우위 (I 우위)
    N_score: 95, // N 우위
    F_score: 95, // F 우위
    P_score: 85, // P 우위
  },
  // I (Indulgence) / N (Novelty) / T (Tech) / J (Judge) - INTJ
  INTJ: {
    type: "INTJ",
    title: "🔍분석적 미래 전략가🔍\n(Indulgence-Novelty-Tech-Judge)",
    description: "내 지출은 '미래를 위한 투자'입니다. 개인 취미나 지적 성장에 필요한 최고의 스펙과 기능을 계획적으로 분석해 구매합니다. 불필요한 소비는 제로! 최소 비용으로 최대 효과를 내려는 '냉철한 소비 설계자'입니다.",
    image: INTJ,
    E_score: 25, // E 우위 (I 우위)
    N_score: 75, // N 우위
    F_score: 10, // F 우위 (T 우위)
    P_score: 15, // P 우위 (J 우위)
  },
  // I (Indulgence) / N (Novelty) / T (Tech) / P (Play) - INTP
  INTP: {
    type: "INTP",
    title: "💡논리적 탐구형 얼리어답터💡\n(Indulgence-Novelty-Tech-Play)",
    description: "신기술과 디지털 콘텐츠는 나의 놀이터! 새로운 것을 접하고 분석하는 데 돈을 씁니다. 지름신이 와도 성능 분석은 필수지만, '이걸 해봐야겠다' 싶으면 바로 지르는 합리적이지만 예측 불가능한 소비자입니다.",
    image: INTP,
    E_score: 35, // E 우위 (I 우위)
    N_score: 85, // N 우위
    F_score: 20, // F 우위 (T 우위)
    P_score: 65, // P 우위
  },
  // I (Indulgence) / S (Saver) / F (Feel) / J (Judge) - ISFJ
  ISFJ: {
    type: "ISFJ",
    title: "🏡안정 추구 실속형🏡\n(Indulgence-Saver-Feel-Judge)",
    description: "나와 나의 공간에 안정과 편안함을 주는 소비가 주를 이룹니다. 가성비 좋은 실용템을 선호하며, 디자인과 만족감도 고려합니다. '내 예산 안에서 최고로 아늑하게' 꾸미는 데 집중하는 신뢰 기반의 계획 소비자입니다.",
    image: ISFJ,
    E_score: 20, // E 우위 (I 우위)
    N_score: 20, // N 우위 (S 우위)
    F_score: 70, // F 우위
    P_score: 15, // P 우위 (J 우위)
  },
  // I (Indulgence) / S (Saver) / F (Feel) / P (Play) - ISFP
  ISFP: {
    type: "ISFP",
    title: "🎨심미적 즉흥 힐링러🎨\n(Indulgence-Saver-Feel-Play)",
    description: "눈에 보이는 예쁜 것, 감각적인 것에 약합니다. 기분 전환을 위한 '시발 비용'이 종종 발생하지만, 결국엔 가격과 실용성을 따지며 후회를 줄입니다. 개인적 만족을 위해 즉흥적인 경험이나 취미 용품에 돈을 씁니다.",
    image: ISFP,
    E_score: 15, // E 우위 (I 우위)
    N_score: 35, // N 우위 (S 우위)
    F_score: 90, // F 우위
    P_score: 80, // P 우위
  },
  // I (Indulgence) / S (Saver) / T (Tech) / J (Judge) - ISTJ
  ISTJ: {
    type: "ISTJ",
    title: "🗄️원칙 준수 절약가🗄️\n(Indulgence-Saver-Tech-Judge)",
    description: "'필요 없는 건 사지 않는다'가 철칙입니다. 오직 기능, 내구성, 가성비만 보고 구매합니다. 계획된 예산에서 한 치도 벗어나지 않으며, 갑작스러운 세일에도 흔들리지 않는 '절제력 만렙' 소비자입니다.",
    image: ISTJ,
    E_score: 10, // E 우위 (I 우위)
    N_score: 5,  // N 우위 (S 우위)
    F_score: 5,  // F 우위 (T 우위)
    P_score: 5,  // P 우위 (J 우위)
  },
  // I (Indulgence) / S (Saver) / T (Tech) / P (Play) - ISTP
  ISTP: {
    type: "ISTP",
    title: "⚙️합리적 문제 해결사⚙️\n(Indulgence-Saver-Tech-Play)",
    description: "평소엔 소비에 관심 없지만, '내 삶의 문제'를 해결할 때만 지갑을 엽니다. 최고의 효율을 내는 공구나 장비, 디지털 기기에만 집중 투자합니다. 합리적이지만, 필요하면 즉각적으로 플렉스하는 '실전형' 소비자입니다.",
    image: ISTP,
    E_score: 25, // E 우위 (I 우위)
    N_score: 10, // N 우위 (S 우위)
    F_score: 10, // F 우위 (T 우위)
    P_score: 60, // P 우위
  },
};