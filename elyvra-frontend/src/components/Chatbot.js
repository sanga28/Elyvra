import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]); // 🆕 All chat sessions
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 Load chats from localStorage
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("elyvra_chats")) || [];
    setChats(savedChats);

    // Set first chat as active if exists
    if (savedChats.length > 0) {
      setActiveChatId(savedChats[0].id);
      setMessages(savedChats[0].messages);
    } else {
      handleNewChat(); // Create one automatically
    }
  }, []);

  // 💾 Save chats to localStorage when changed
  useEffect(() => {
    localStorage.setItem("elyvra_chats", JSON.stringify(chats));
  }, [chats]);

  // 🆕 Create a new chat session
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Chat ${chats.length + 1}`,
      messages: [
        { sender: "bot", text: "Hi, I’m Elyvra 🌸 How can I help you today?" },
      ],
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setMessages(newChat.messages);
  };

  // 📩 Send message
  const handleSend = async () => {
    if (!input.trim() || !activeChatId) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Update chat messages locally
    updateChatMessages(activeChatId, updatedMessages);

    try {
      const res = await axios.post("http://127.0.0.1:9000/chat", { text: input });
      const botMessage = { sender: "bot", text: res.data.response };
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      updateChatMessages(activeChatId, finalMessages);
    } catch (err) {
      console.error(err);
      const errorMsg = { sender: "bot", text: "Sorry, something went wrong 😢" };
      const finalMessages = [...updatedMessages, errorMsg];
      setMessages(finalMessages);
      updateChatMessages(activeChatId, finalMessages);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Helper: update messages inside the chats array
  const updateChatMessages = (chatId, newMessages) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: newMessages } : chat
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // 🧭 Switch chat
  const handleChatSelect = (chat) => {
    setActiveChatId(chat.id);
    setMessages(chat.messages);
  };

  return (
    <>
      {!isOpen && (
        <div className="chatbot-button-wrapper">
          <div className="chatbot-tooltip">Hi! How can I help you?</div>
          <button className="chatbot-button" onClick={() => setIsOpen(true)}>
            🤖
          </button>
        </div>
      )}

      {isOpen && (
        <div className="chatbot-fullscreen">
          {/* Sidebar */}
          <div className="chatbot-sidebar">
            <h3>💬 Elyvra Chat</h3>
            <button className="new-chat-btn" onClick={handleNewChat}>
              + New Chat
            </button>
            <div className="chat-list">
              {chats.length === 0 ? (
                <p className="no-chats">No chats yet.</p>
              ) : (
                chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`chat-item ${
                      chat.id === activeChatId ? "active" : ""
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    {chat.name}
                  </div>
                ))
              )}
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖ Close
            </button>
          </div>

          {/* Chat Window */}
          <div className="chatbot-main">
            <div className="chatbox-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && <div className="chat-message bot">Typing...</div>}
            </div>

            <div className="chatbox-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
