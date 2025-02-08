import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Styling for chatbot

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me anything about Odisha.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3000/chat", { userQuery: input });
      setMessages([...newMessages, { text: res.data.response, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error connecting to AI.", sender: "bot" }]);
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Odisha AI Guide</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about Odisha..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
