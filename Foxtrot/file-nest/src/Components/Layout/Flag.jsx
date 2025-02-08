import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegFile } from "react-icons/fa6";

const Flag = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/files/flags`, {
        headers: {
          token: localStorage.getItem("authToken"),
          room: "global",
        },
      })
      .then((res) => {
          console.log(res);
        setFiles(res.data.flaggedFiles)
      })
      .catch((err) => {
        console.error("Error fetching chapters:", err);
        setFiles([]);
      });
  }, []);

  return (
    <>
      <div className="w-[95%] flex flex-col self-end gap-2 rounded-sm bg-[#f8f4ff] border border-gray-300 p-2 transition-all duration-300">
        {files.map(({ fileUrl, fileName }, index) => (
          <span
            key={index}
            className="flex items-center gap-2 p-2 cursor-pointer rounded-md text-gray-700 hover:bg-[#680B79]/50 hover:text-gray-50 transition-all duration-200"
          >
            <FaRegFile className="text-gray-700" />
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          </span>
        ))}
      </div>
    </>
  );
};

export default Flag;
