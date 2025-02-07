import React from "react";
import { RxDotFilled } from "react-icons/rx";

const ChatBox = ({ message }) => {
  const isCurrentUser = message.sender === localStorage.getItem("username");

  return (
    <div
      className={`p-1.5 max-w-[60%] flex gap-2 z-40 ${
        isCurrentUser ? "self-end flex-row-reverse" : ""
      }`}
    >
      <img
        src={isCurrentUser ? "src/assets/man.png" : "src/assets/user.png"}
        alt=""
        className="w-[40px] h-[40px]"
      />
      <div
        className={`flex flex-col gap-1 ${
          isCurrentUser ? "items-end" : "items-start"
        }`}
      >
        <span
          className={`flex items-center justify-between ${
            isCurrentUser ? " flex-row-reverse" : "flex-row"
          }`}
        >
          <p className="text-sm font-semibold">{message.sender}</p>
          <RxDotFilled className="text-gray-800" />
          <p className="text-[12px] text-gray-950">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </span>
        {message.message && (
          <span
            className={`p-2 rounded-b-md ${
              isCurrentUser
                ? "rounded-tl-xl bg-[#000000d1] text-white"
                : "rounded-tr-xl bg-gray-300/30 text-gray-800"
            }`}
          >
            {message.message}
          </span>
        )}
        {message.file &&
          (message.file.endsWith(".png") ||
          message.file.endsWith(".jpg") ||
          message.file.endsWith(".jpeg") ||
          message.file.endsWith(".gif") ? (
            <div className="p-2 bg-gray-300/30 rounded-xl">
              <img
                src={message.file}
                alt=""
                className="h-full object-contain rounded-xl"
              />
            </div>
          ) : (
            <p className="text-gray-800 p-2 text-md lowercase bg-gray-300/30 rounded-md">
              {message.file.split("/").pop()}
            </p>
          ))}
      </div>
    </div>
  );
};

export default ChatBox;
