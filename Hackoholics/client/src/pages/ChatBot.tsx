import React, { useState } from "react";
import axios from "axios";
import { Message } from "../types/index";
import { MessageList } from "../components/MessageList";
import { ActionButtons } from "../components/ActionButtons";
import { ChatInput } from "../components/ChatInput";
import { useUIContext } from "../contexts/ui.context";
import { ClipLoader } from "react-spinners";

function ChatBot() {
  const { isSidebarVisible } = useUIContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I assist you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert("Please upload a resume PDF first.");
      return;
    }

    setLoading(true);

    try {
      const textInput = inputText;
      setInputText("");
      const pdfContent = await inputPdfSetup(uploadedFile);
      const response = await getGeminiResponse(
        textInput,
        pdfContent,
        chatHistory
      );
      setMessages([
        ...messages,
        {
          text: textInput,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isUser: true,
        },
        {
          text: response,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isUser: false,
        },
      ]);
      setChatHistory([
        ...chatHistory,
        `User: ${textInput}`,
        `Bot: ${response}`,
      ]);
    } catch (error) {
      console.error("Error handling submit:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputPdfSetup = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:5001/api/pdf-to-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  };

  const getGeminiResponse = async (
    inputText: string,
    pdfContent: any,
    chatHistory: string[]
  ) => {
    const response = await axios.post(
      "http://localhost:5001/api/gemini-response",
      {
        inputText,  
        pdfContent,
        chatHistory,
      }
    );

    return response.data.text;
  };

  return (
    <div
      className={`flex-1 bg-gray-200 transition-all duration-300 overflow-hidden ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-50 ">
          <ClipLoader color="#3B82F6" size={50} />
        </div>
      )}
      <div className="flex justify-center max-h-[calc(100vh-4rem)]">
        <div className="w-3/4 max-w-5xl bg-gray-200 min-h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1 py-3">
            <MessageList messages={messages} />
          </div>
          <div className="bg-gray-200 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-3">
              <div className="flex items-center space-x-4 mb-1">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
                >
                  Upload Resume
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />
                {uploadedFile && (
                  <span className="text-gray-700 text-sm">
                    {uploadedFile.name}
                  </span>
                )}
              </div>

              <ActionButtons 
                onActionClick={async (actionText: string) => {
                  if (!uploadedFile) {
                    alert("Please upload a resume PDF first.");
                    return;
                  }

                  setLoading(true);

                  try {
                    const pdfContent = await inputPdfSetup(uploadedFile);
                    const response = await getGeminiResponse(
                      actionText,
                      pdfContent,
                      chatHistory
                    );
                    setMessages([
                      ...messages,
                      {
                        text: actionText,
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        isUser: true,
                      },
                      {
                        text: response,
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        isUser: false,
                      },
                    ]);
                    setChatHistory([
                      ...chatHistory,
                      `User: ${actionText}`,
                      `Bot: ${response}`,
                    ]);
                  } catch (error) {
                    console.error("Error handling action click:", error);
                  } finally {
                    setLoading(false);
                  }
                }}
              />
              <ChatInput
                inputText={inputText}
                setInputText={setInputText}
                handleSend={handleSubmit}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
