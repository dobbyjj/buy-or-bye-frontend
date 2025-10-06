import React, { useState } from "react";
import BottomNavbar from "../components/common/BottomNavbar";

function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! 저는 당신의 AI 어시스턴트입니다. 궁금한 것이 있으면 언제든지 물어보세요! 😊" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://buy-or-bye-backend.onrender.com/api/chatbot/request", {
        method: "POST",
        body: JSON.stringify({
          question: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || "죄송합니다, 응답을 생성할 수 없습니다.";
      
      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      setMessages(prev => [...prev, { 
        sender: "bot", 
        text: "죄송합니다, 현재 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          textAlign: "center", 
          width: "100%",
          maxWidth: 768,
          margin: "0 auto",
          padding: "24px 8px",
        }}
      >
        <h2 style={{
          fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 700,
          color: "#222",
          marginBottom: 24
        }}>챗봇</h2>
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #eee",
          padding: "24px 16px",
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          <div style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: 12,
            maxHeight: 220,
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                marginBottom: 8,
              }}>
                <span style={{
                  display: "inline-block",
                  background: msg.sender === "user" ? "#4B4BFF" : "#eee",
                  color: msg.sender === "user" ? "#fff" : "#222",
                  borderRadius: 8,
                  padding: "8px 12px",
                  maxWidth: "80%",
                  fontSize: 15,
                  wordBreak: "break-word"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: "left", marginBottom: 8 }}>
                <span style={{
                  display: "inline-block",
                  background: "#eee",
                  color: "#222",
                  borderRadius: 8,
                  padding: "8px 12px",
                  maxWidth: "80%",
                  fontSize: 15,
                }}>
                  답변을 불러오는 중...
                </span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="메시지를 입력하세요"
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 15,
                outline: "none",
              }}
              onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              style={{
                background: "#4B4BFF",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0 18px",
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? "..." : "전송"}
            </button>
          </div>
        </div>
      </div>
      <BottomNavbar active="chatbot" />
    </div>
  );
}

export default ChatbotPage;
