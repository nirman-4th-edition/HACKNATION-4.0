import { Textarea, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";

export default function TextArea({ onSendMessage }) {
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);

  async function getUserName() {
    try {
      const response = await axios.get("http://localhost:3001/users/name", {
        headers: {
          token: localStorage.getItem("authToken"),
        },
      });
      console.log("Username:", response.data.username);
      return response.data.username;
    } catch (error) {
      console.error("Error fetching username", error);
      return "User";
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !file) return; // Do nothing if no text and no file

    const name = localStorage.getItem("username") || (await getUserName());
    let fileUrl = null;

    // If there is a file attached, upload it first
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://localhost:3001/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: localStorage.getItem("authToken"),
            },
          }
        );
        fileUrl = res.data.fileUrl; // Get file URL from backend
        console.log("File uploaded successfully:", fileUrl);
      } catch (err) {
        console.error("File upload failed:", err);
        return;
      }
    }

    // Create the message object. If no file was attached, fileUrl remains null.
    const newMessage = {
      sender: name,
      message: inputValue,
      file: fileUrl, // Either a valid URL or null
      fileName: file ? file.name : null, // Add the file name
      timestamp: new Date(), // Get time in 24-hour format
    };

    // Call onSendMessage provided by the parent (ChatPanel)
    onSendMessage(newMessage);

    // Clear the input and file state after sending
    setInputValue("");
    setFile(null);
  };

  return (
    <div className="flex w-[95%] flex-row text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none placeholder-gray-900 p-1">
      <Textarea
        rows={1}
        resize={false}
        placeholder="Your Message"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="min-h-full !border-0 focus:border-transparent text-gray-900 hide-scroll"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of the Enter key
            handleSendMessage(); // Trigger the send message function
          }
        }}
        containerProps={{ className: "grid h-full" }}
        labelProps={{ className: "before:content-none after:content-none" }}
      />
      <input
        className="block w-[200px] text-sm p-3 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 mr-4"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <IconButton
        variant="text"
        className="rounded-full hover:bg-gray-300 cursor-pointer"
        onClick={handleSendMessage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-6 w-6 text-gray-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </IconButton>
    </div>
  );
}
