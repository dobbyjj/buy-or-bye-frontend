// src/data/questions.js

export const quizQuestions = [
  // E vs I (1~5번)
  { id: 1, question: "주말에 하루 쉰다!", options: [
    { text: "A. 친구 불러 모임·약속 달려간다 🍻", type: "E" },
    { text: "B. 집에서 취미·넷플릭스·혼자만의 힐링 🎧", type: "I" }
  ] },
  { id: 2, question: "동네에 유명한 맛집이 오픈했다!", options: [
    { text: "A. 바로 친구랑 먹으러 간다 🍲", type: "E" },
    { text: "B. 조용히 가서 포장해와 집에서 즐김 🏠", type: "I" }
  ] },
  { id: 3, question: "쇼핑할 때 더 즐거운 순간은?", options: [
    { text: "A. 친구랑 같이 구경하면서 수다 떠는 순간 👯", type: "E" },
    { text: "B. 혼자서 진지하게 고르며 몰입하는 순간 🛍", type: "I" }
  ] },
  { id: 4, question: "새 옷 샀을 때 가장 먼저 하는 행동은?", options: [
    { text: "A. 바로 친구들 만나 입어보고 자랑 📸", type: "E" },
    { text: "B. 집에서 거울 보면서 혼자 만족 🪞", type: "I" }
  ] },
  { id: 5, question: "내가 소비 후 뿌듯할 때는?", options: [
    { text: "A. 사람들과 추억·에피소드 생겼을 때 🎉", type: "E" },
    { text: "B. 혼자만의 만족감 뿌듯하게 느낄 때 🛋", type: "I" }
  ] },

  // N vs S (6~10번) - 'N'을 '직관/미래' 성향, 'S'를 '감각/현실' 성향으로 가정하여 매핑
  { id: 6, question: "관심 있던 제품 광고를 봤다!", options: [
    { text: "A. “스토리랑 감성에 울컥…” 😭", type: "N" },
    { text: "B. “가격, 성능, 실용성 좋네.” 📊", type: "S" }
  ] },
  { id: 7, question: "필요한 품목 신제품 등장!", options: [
    { text: "A. “와 새 경험, 무조건 해봐야지!” ✨", type: "N" },
    { text: "B. “스펙·후기 확인 먼저.” 🧐", type: "S" }
  ] },
  { id: 8, question: "여행 계획할 때 나는?", options: [
    { text: "A. 남들 잘 안 가는 힙한 곳 찾아간다 ✈️", type: "N" },
    { text: "B. 교통·숙소·편리성 꼼꼼히 따진다 🧳", type: "S" }
  ] },
  { id: 9, question: "쇼핑할 때 더 끌리는 건?", options: [
    { text: "A. “이 브랜드의 철학이 좋아~” 🌱", type: "N" },
    { text: "B. “실제로 써보니 내구성 좋더라.” 🧰", type: "S" }
  ] },
  { id: 10, question: "신제품 체험단 신청 기회!", options: [
    { text: "A. “재밌겠다! 해보고 후기 써야지” 📝", type: "N" },
    { text: "B. “쓸만한 거면 신청, 아니면 패스” 🚪", type: "S" }
  ] },

  // T vs F (11~15번)
  { id: 11, question: "친구가 “이거 살까?”라고 물어보면?", options: [
    { text: "A. “가성비 별로야, 차라리 이거 사” 📉", type: "T" },
    { text: "B. “너한테 완전 찰떡인데??” 💕", type: "F" }
  ] },
  { id: 12, question: "소비에서 더 중요한 건?", options: [
    { text: "A. 합리성·스펙·가성비 🛠", type: "T" },
    { text: "B. 감성·만족감·스토리 🌈", type: "F" }
  ] },
  { id: 13, question: "신상 스마트폰 출시!", options: [
    { text: "A. CPU, 배터리 스펙부터 검색 📱", type: "T" },
    { text: "B. 색감·디자인 보고 바로 심쿵 🫶", type: "F" }
  ] },
  { id: 14, question: "후회되는 소비는 언제?", options: [
    { text: "A. 쓸모없는 충동구매했을 때 😩", type: "T" }, // 비합리적 소비에 대한 후회 -> T
    { text: "B. 기회 놓쳐서 핫딜을 못 샀을 때 😢", type: "F" } // 감정적 놓침에 대한 후회 -> F
  ] },
  { id: 15, question: "나한테 소비는?", options: [
    { text: "A. 필요와 효율을 맞추는 합리적 활동 ⚙️", type: "T" },
    { text: "B. 나를 표현하고 기분 전환하는 감성 놀이 🎨", type: "F" }
  ] },

  // J vs P (16~20번)
  { id: 16, question: "세일 시즌에 나는?", options: [
    { text: "A. 장바구니 미리 준비, 계획적 구매 📋", type: "J" },
    { text: "B. “와 70% 세일!” 충동구매 🛒", type: "P" }
  ] },
  { id: 17, question: "여행 준비할 때 나는?", options: [
    { text: "A. 숙소·예산·동선까지 완벽 계획 🗺", type: "J" },
    { text: "B. 일단 떠나고 현지에서 정함 🎲", type: "P" }
  ] },
  { id: 18, question: "갑자기 시간이 비었을 때!", options: [
    { text: "A. 미뤄둔 할 일·취미 정리 ✍️", type: "J" },
    { text: "B. 즉흥적으로 나가 놀거리 찾음 🎳", type: "P" }
  ] },
  { id: 19, question: "구독 서비스 결제할 때 나는?", options: [
    { text: "A. 장기 결제 할인 꼼꼼히 따짐 💳", type: "J" },
    { text: "B. “이번 달만 봐야지” 바로 결제 ▶️", type: "P" }
  ] },
  { id: 20, question: "나에게 플렉스(Flex)는?", options: [
    { text: "A. 꼭 필요했던 고오급템 똑똑하게 구매 💼", type: "J" },
    { text: "B. 지금 당장 나에게 시발비용 지르기 💃", type: "P" }
  ] },
];