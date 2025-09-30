import React, { useState } from "react";
import BottomNavbar from "../components/common/BottomNavbar";

function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요! 무엇을 도와드릴까요?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const newUserMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    const apiMessages = messages.map(msg => ({
      role: msg.sender === "bot" ? "assistant" : "user",
      content: msg.text,
    }));

    apiMessages.push({ role: "user", content: input });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.content }]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages(prev => [...prev, { sender: "bot", text: "죄송합니다, 답변을 가져오는 중 오류가 발생했습니다." }]);
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