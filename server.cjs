
// server.js
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv/config'); // .env 파일을 읽기 위해 추가

const app = express();
const port = 3001; // 프론트엔드(Vite)와 다른 포트 사용

// 1. 미들웨어 설정
app.use(cors()); // 모든 출처의 요청을 허용
app.use(express.json()); // 요청 본문을 JSON으로 파싱

// 2. OpenAI 클라이언트 초기화
// API 키는 서버에서만 사용되므로 안전합니다.
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

// 3. API 라우트 설정
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: 'messages가 필요합니다.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    res.json(completion.choices[0].message);

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: '서버에서 오류가 발생했습니다.' });
  }
});

// 4. 서버 실행
app.listen(port, () => {
  const host = process.env.HOST || 'localhost';
  console.log(`서버가 http://${host}:${port} 에서 실행 중입니다.`);
});
