import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSend: () => void;
  disabled: boolean;
}

export function ChatInput({ inputText, setInputText, handleSend, disabled }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent text-sm sm:text-base"
      />
      <button
        onClick={handleSend}
        className="bg-[#00BCD4] p-2 rounded-full text-white hover:bg-[#00ACC1] transition-colors flex-shrink-0"
      >
        <Send size={20} />
      </button>
    </div>
  );
}