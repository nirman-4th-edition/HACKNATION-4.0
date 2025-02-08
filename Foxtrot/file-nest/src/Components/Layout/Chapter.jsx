import { useEffect, useState } from "react";
import { FaFolderClosed } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import File from "./File";
import axios from "axios";

const Chapter = ({ selectedSubject }) => {
  const [isOpen, setIsOpen] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/files/chapters/list`, {
        params: {
          subject: selectedSubject,
        },
        headers: {
          token: localStorage.getItem("authToken"),
          room: "global",
        },
      })
      .then((res) => {
        setChapters(res.data.chapters);
      })
      .catch((err) => {
        console.error("Error fetching chapters:", err);
        setChapters([]);
      });
  }, [selectedSubject]);

  const toggleChapter = (index) => {
    setIsOpen((prev) => {
      const newOpenState = [...prev];
      newOpenState[index] = !newOpenState[index];
      return newOpenState;
    });
  };

  return (
    <div className="p-2 flex flex-col items-end gap-3 w-full h-full overflow-scroll rounded-sm hide-scroll ">
      {chapters.map((chapter, index) => (
        <div key={index} className="w-full flex flex-col gap-2">
          <div
            className="flex items-center justify-between w-full border border-[#680B79] bg-[#3a0842] hover:bg-[#0D021F] text-gray-50 font-medium cursor-pointer p-2 box-border rounded-md transition-all duration-200"
            onClick={() => toggleChapter(index)}
          >
            <span className="flex gap-2 items-center">
              <FaFolderClosed className="text-gray-100" />
              <p>{chapter}</p>
            </span>
            <IoIosArrowBack
              className={`transform transition-transform ${
                isOpen[index] ? "rotate-90" : ""
              }`}
            />
          </div>
          {isOpen[index] && <File selectedSubject={selectedSubject} chapter={chapter} />}
        </div>
      ))}
    </div>
  );
};

export default Chapter;