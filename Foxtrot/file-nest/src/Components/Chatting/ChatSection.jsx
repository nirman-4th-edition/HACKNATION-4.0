import React, { useEffect, useRef } from "react";
import ChatBox from "./ChatBox";

const ChatSection = ({ messages = [] }) => {
  // Default to empty array

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={chatContainerRef}  className="w-full h-[77%] flex flex-col gap-2 overflow-scroll hide-scroll">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <ChatBox key={index} message={message} />
        ))
      ) : (
        <p className="text-center text-gray-900 font-thin">No messages yet</p> // Handle empty case
      )}
    </div>
  );
};

export default ChatSection;
