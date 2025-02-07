import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegFile } from "react-icons/fa6";

const File = ({ selectedSubject, chapters }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/files/specific`, {
        params: {
          subject: selectedSubject,
          chapter: chapters,
        },
        headers: {
          token: localStorage.getItem("authToken"),
          room: "global",
        },
      })
      .then((res) => {
        setFiles(res.data.files);
      })
      .catch((err) => {
        console.error("Error fetching chapters:", err);
        setFiles([]);
      });
  }, [selectedSubject, chapters]);

  return (
    <div className="w-[95%] flex flex-col self-end gap-2 rounded-sm bg-gray-100 border border-gray-300 p-2 transition-all duration-300">
      {files.map(({ fileUrl, fileName }, index) => (
        <span
          key={index}
          className="flex items-center gap-2 p-2 cursor-pointer rounded-md text-gray-700 hover:bg-gray-200/50 transition-all duration-200"
        >
          <FaRegFile className="text-gray-700" />
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileName}
          </a>
        </span>
      ))}
    </div>
  );
};

export default File;
