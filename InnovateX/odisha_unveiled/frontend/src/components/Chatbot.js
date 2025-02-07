import { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!userQuery.trim()) return;

    const userMessage = { sender: 'user', text: userQuery };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.response };

      setChatHistory([...chatHistory, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setUserQuery('');
  };

  return (
    <div className="chatbot">
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>💬</div>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h4>Odisha Guide Chatbot</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask about Odisha..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
