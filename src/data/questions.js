export const quizQuestions = [
  // E (Event) vs I (Indulgence)
  { id: 1, question: "주말에 하루 쉰다!", options: [
    { text: "A. 친구 불러 모임·약속 달려간다 🍻", type: "E" },
    { text: "B. 집에서 취미·넷플릭스·혼자만의 힐링 🎧", type: "I" }
  ] },
  { id: 2, question: "동네에 유명한 맛집이 오픈했다!", options: [
    { text: "A. 바로 친구랑 '경험'하러 간다 🍲", type: "E" },
    { text: "B. 조용히 '혼자만의 시간'을 위해 포장해 온다 🏠", type: "I" }
  ] },
  { id: 3, question: "가장 신나는 소비는?", options: [
    { text: "A. 사람들과 함께 '추억'을 만드는 경험 🥂", type: "E" },
    { text: "B. 나만을 위한 '취미' 용품을 구매하는 순간 🛍", type: "I" }
  ] },
  { id: 4, question: "지출에 대한 사람들의 반응은?", options: [
    { text: "A. '오! 재밌겠다! 부럽다'는 반응 📸", type: "E" },
    { text: "B. '나한테도 딱 맞겠네'라고 속으로 생각하는 반응 🪞", type: "I" }
  ] },
  { id: 5, question: "소비 후 가장 뿌듯한 때는?", options: [
    { text: "A. 모임에서 '에피소드'를 만들었을 때 🎉", type: "E" },
    { text: "B. '개인 만족도'가 높아서 행복할 때 🛋", type: "I" }
  ] },

  // N (Novelty) vs S (Saver)
  { id: 6, question: "관심 있던 제품 광고를 봤다!", options: [
    { text: "A. “브랜드 철학이 멋지네, 가치를 산다” 🌱", type: "N" },
    { text: "B. “가격, 성능, 실용성이 좋네” 📊", type: "S" }
  ] },
  { id: 7, question: "필요한 품목 신제품 등장!", options: [
    { text: "A. “이전과 다른 새 경험, 무조건 해봐야지!” ✨", type: "N" },
    { text: "B. “스펙 대비 가격은 어떤지 후기부터 확인” 🧐", type: "S" }
  ] },
  { id: 8, question: "여행 계획할 때 나는?", options: [
    { text: "A. 남들 잘 안 가는 '힙한 곳'이나 새로운 체험 위주 ✈️", type: "N" },
    { text: "B. 교통·숙소·편의 시설의 '실용성'을 꼼꼼히 따진다 🧳", type: "S" }
  ] },
  { id: 9, question: "같은 제품이라면 더 끌리는 건?", options: [
    { text: "A. “미래 기술, 친환경 가치가 담겼네” 🚀", type: "N" },
    { text: "B. “지금 바로 할인하는 가성비 모델” 💸", type: "S" }
  ] },
  { id: 10, question: "신제품 체험단 신청 기회!", options: [
    { text: "A. “재밌겠다! 새 경험 해보고 후기 써야지” 📝", type: "N" },
    { text: "B. “정말 쓸만한 실용템이면 신청, 아니면 패스” 🚪", type: "S" }
  ] },

  // T (Tech) vs F (Feel)
  { id: 11, question: "친구가 “이거 살까?”라고 물어보면?", options: [
    { text: "A. “가성비 별로야, 차라리 '효율 좋은' 이거 사” 📉", type: "T" },
    { text: "B. “'너한테 완전 찰떡'이고 예쁘다!” 💕", type: "F" }
  ] },
  { id: 12, question: "소비에서 더 중요한 건?", options: [
    { text: "A. '합리성·스펙·장기적 효율' 🛠", type: "T" },
    { text: "B. '감성·디자인·만족감' 🌈", type: "F" }
  ] },
  { id: 13, question: "신상 스마트폰 출시!", options: [
    { text: "A. CPU, 배터리 '성능 스펙'부터 검색 📱", type: "T" },
    { text: "B. '색감·디자인' 보고 바로 심쿵 🫶", type: "F" }
  ] },
  { id: 14, question: "후회되는 소비는 언제?", options: [
    { text: "A. '쓸모없는' 비합리적 충동구매를 했을 때 😩", type: "T" },
    { text: "B. '핫딜'을 놓쳐서 기분이 상했을 때 😢", type: "F" }
  ] },
  { id: 15, question: "나한테 소비는?", options: [
    { text: "A. '필요와 효율'을 맞추는 합리적 활동 ⚙️", type: "T" },
    { text: "B. 나를 '표현하고' 기분 전환하는 감성 놀이 🎨", type: "F" }
  ] },

  // J (Judge) vs P (Play)
  { id: 16, question: "세일 시즌에 나는?", options: [
    { text: "A. 장바구니 미리 준비, '예산 내 계획적' 구매 📋", type: "J" },
    { text: "B. “와 70% 세일!” '즉시 충동' 구매 🛒", type: "P" }
  ] },
  { id: 17, question: "여행 준비할 때 나는?", options: [
    { text: "A. 숙소·예산·동선까지 '완벽 계획'을 세운다 🗺", type: "J" },
    { text: "B. 일단 떠나고 '현지에서 즉흥적'으로 정함 🎲", type: "P" }
  ] },
  { id: 18, question: "고가품을 구매할 때 나는?", options: [
    { text: "A. '장기 결제' 할인, 관리 계획을 세운다 💳", type: "J" },
    { text: "B. '지금 당장'의 만족을 위해 일단 결제 ▶️", type: "P" }
  ] },
  { id: 19, question: "소비 예산 관리는?", options: [
    { text: "A. 매달 꼼꼼히 '목표'를 세워 지출을 통제한다 💰", type: "J" },
    { text: "B. 크게 신경 안 쓰고 '유연하게' 그때그때 쓴다 ⚖️", type: "P" }
  ] },
  { id: 20, question: "나에게 플렉스(Flex)는?", options: [
    { text: "A. 꼭 필요했던 '고오급템'을 계획적으로 구매 💼", type: "J" },
    { text: "B. 지금 당장 나에게 '시발비용' 지르기 💃", type: "P" }
  ] },
];