import React from 'react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 ${
          message.isUser
            ? 'bg-[#00BCD4] text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {/* <p >{message.text}</p> */}
        <ReactMarkdown className="break-words">{message.text}</ReactMarkdown>
        <p className={`text-xs mt-1 ${message.isUser ? 'text-gray-100' : 'text-gray-500'}`}>
          {message.time}
        </p>
      </div>
    </div>
  );
}