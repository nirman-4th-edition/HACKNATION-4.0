"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, User, Bot, Send } from "lucide-react";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

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

    const sendMessage = (text: string = input) => {
        if (!text.trim() && !file) return;

        setMessages([...messages, { text, sender: "user", file }]);
        setInput("");
        setFile(null);
    };

    const suggestionButtons = [
        "How can I book an appointment?",
        "Tell me about available doctors",
        "Give me some health tips"
    ];

    return (
        <AuroraBackground>
            <div className="flex flex-col items-center justify-center w-full h-screen overflow-auto p-6 bg-gradient-to-tr from-gray-900 via-green-900 to-emerald-900 text-white">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center relative">
                        <h2 className="text-4xl font-medium">Hello {username}, welcome to Dhanwantari</h2>
                        <p className="text-gray-100 mt-4 text-2xl">Here are some things you can ask:</p>
                        <div className="mt-6 flex h-fit gap-6">
                            {suggestionButtons.map((text, index) => (
                                <button
                                    key={index}
                                    onClick={() => sendMessage(text)}
                                    className="px-4 py-2 rounded-full text-gray-100 transition bg-white/10 backdrop-blur-md hover:bg-white/15"
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className=" w-3/5 flex-1 relative overflow-y-auto space-y-4 p-4 custom-scrollbar">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center space-x-3 p-3 rounded-xl max-w-[80%] w-fit ${msg.sender === "bot" ? "bg-gray-900 text-left" : "bg-black/40 text-white ml-auto flex-row-reverse"}`}>
                            {msg.sender === "bot" ? <Bot className="w-7 h-7 mr-2 text-gray-400" /> : <User className="w-7 h-7 ml-2 text-gray-400" />}
                            <div className="text-sm leading-relaxed">
                                {msg.text}
                                {msg.file && <p className="text-xs text-gray-400 mt-1">📎 {msg.file.name}</p>}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center bg-white/10 w-[55%] rounded-full px-3 py-2 relative">
                    <label className="cursor-pointer p-2">
                        <Paperclip className="w-5 h-5 text-gray-200 hover:text-white" />
                        <input type="file" className="hidden" onChange={(e) => setFile(e.target.files![0])} />
                    </label>
                    <input
                        type="text"
                        className="flex-1 px-3 bg-transparent text-white placeholder-gray-200 focus:outline-none"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        className="btn-gradient2 p-2"
                        style={{ borderRadius: "50%" }}
                        onClick={() => sendMessage()}
                    >
                        <Send className="size-4" />
                    </button>
                </div>
            </div>
        </AuroraBackground>
    );
}