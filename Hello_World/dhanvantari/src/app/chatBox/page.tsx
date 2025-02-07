"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, User, Bot, Send } from "lucide-react";

interface Message {
  text: string;
  sender: "user" | "bot";
  file?: File | null;
}

interface ChatbotProps {
  username?: string;
}

export default function Chatbot({ username = "User" }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() && !file) return;
    
    setMessages([...messages, { text: input, sender: "user", file }]);
    setInput("");
    setFile(null);
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto p-6 bg-gray-900 shadow-xl rounded-lg h-[600px] border border-gray-700 text-white relative">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-xl font-semibold">Hello {username}, welcome to Dhanwantari</h2>
          <p className="text-gray-400 mt-2">Here are some things you can ask:</p>
          <div className="mt-3 space-y-2">
            <button className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition">How can I book an appointment?</button>
            <button className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition">Tell me about available doctors</button>
            <button className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition">Give me some health tips</button>
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-center space-x-3 p-3 rounded-xl max-w-[80%] ${msg.sender === "bot" ? "bg-gray-800 text-left" : "bg-blue-600 text-white ml-auto flex-row-reverse"}`}>
            {msg.sender === "bot" ? <Bot className="w-7 h-7 text-gray-400" /> : <User className="w-7 h-7 text-gray-400" />}
            <div className="text-sm leading-relaxed">
              {msg.text}
              {msg.file && <p className="text-xs text-gray-400 mt-1">📎 {msg.file.name}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center border-t border-gray-700 p-3 bg-gray-800 rounded-b-lg">
        <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 flex-1">
          <label className="cursor-pointer p-2">
            <Paperclip className="w-5 h-5 text-gray-400 hover:text-white" />
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files![0])} />
          </label>
          <input
            type="text"
            className="flex-1 px-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition" onClick={sendMessage}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}