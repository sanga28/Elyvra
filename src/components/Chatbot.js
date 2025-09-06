import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I’m Elyvra 🌸 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([{ id: 1, title: "New Chat" }]);
  const [currentChat, setCurrentChat] = useState(1);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:9000/chat", { text: input });
      const botMessage = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const botMessage = { sender: "bot", text: "⚠️ Sorry, something went wrong." };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const startNewChat = () => {
    const newId = history.length + 1;
    setHistory([...history, { id: newId, title: "New Chat " + newId }]);
    setCurrentChat(newId);
    setMessages([{ sender: "bot", text: "🌸 Hi! How can I assist you today?" }]);
  };

  return (
    <div>
      {/* Floating Avatar */}
      {!isOpen && (
        <div className="chatbot-button-wrapper">
          <button className="chatbot-button" onClick={() => setIsOpen(true)}>
            🤖
          </button>
        </div>
      )}

      {/* Fullscreen Chat */}
      {isOpen && (
        <div className="chatbot-fullscreen">
          {/* Sidebar */}
          <div className="chatbot-sidebar">
            <h2>💬 Elyvra</h2>
            <button onClick={startNewChat} className="newchat-btn">＋ New Chat</button>
            <div className="chat-history">
              {history.map((chat) => (
                <div
                  key={chat.id}
                  className={`history-item ${chat.id === currentChat ? "active" : ""}`}
                  onClick={() => setCurrentChat(chat.id)}
                >
                  {chat.title}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chatbot-main">
            <div className="chatbox-header">
              <span>🌸 Elyvra Assistant</span>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>

            <div className="chatbox-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  {msg.sender === "bot" ? "🤖 " : "🧑 "} {msg.text}
                </div>
              ))}
              {loading && <div className="chat-message bot">🤖 Typing...</div>}
            </div>

            {/* Input */}
            <div className="chatbox-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={handleSend}>➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
