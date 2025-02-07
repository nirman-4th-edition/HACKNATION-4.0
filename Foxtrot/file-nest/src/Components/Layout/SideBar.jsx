import React, { useState } from "react";
import { GiNestBirds } from "react-icons/gi";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { GoDiscussionClosed } from "react-icons/go";
import { PiFileHtmlLight } from "react-icons/pi";
import { SiThealgorithms } from "react-icons/si";
import { CiFlag1 } from "react-icons/ci";
import { RiAB } from "react-icons/ri";
import Storage from "./Storage";

const SideBar = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("AD");   //default

  return (
    <>
      <div className="flex w-[45%] justify-center">
        <div className="flex flex-col gap-5 justify-start items-start bg-[#0D021F] w-[45%] relative overflow-hidden">
          <div className="h-full w-full px-3 py-4 overflow-y-auto bg-[#0d021f]">
            <a className="flex items-center ml-1">
              <GiNestBirds className="text-4xl text-gray-100 mr-2" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                FileNest
              </span>
            </a>
            <hr className="w-48 h-[2px] my-2 mx-2 border-0 rounded-sm bg-gray-50" />
            <ul className="space-y-2 font-medium mt-5">
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                    selectedSubject === "AD"
                      ? "bg-[#3a0842]"
                      : "hover:bg-gray-100 dark:hover:bg-[#3a0842]"
                  } group`}
                  onClick={() => setSelectedSubject("AD")}
                >
                  <SiThealgorithms className="text-xl text-white" />
                  <span className="ms-3">Algorithm Design</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                    selectedSubject === "ALA"
                      ? "bg-[#3a0842]"
                      : "hover:bg-gray-100 dark:hover:bg-[#3a0842]"
                  } group`}
                  onClick={() => setSelectedSubject("ALA")}
                >
                  <RiAB className="text-xl text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">ALA</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                    selectedSubject === "CSW"
                      ? "bg-[#3a0842]"
                      : "hover:bg-gray-100 dark:hover:bg-[#3a0842]"
                  } group`}
                  onClick={() => setSelectedSubject("CSW")}
                >
                  <PiFileHtmlLight className="text-xl" />
                  <span className="flex-1 ms-3 whitespace-nowrap">CSW-II</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                    selectedSubject === "Discussions"
                      ? "bg-[#3a0842]"
                      : "hover:bg-gray-100 dark:hover:bg-[#3a0842]"
                  } group`}
                  onClick={() => setSelectedSubject("Discussions")}>
                  <GoDiscussionClosed className="text-xl text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Discussions
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                    selectedSubject === "Flag"
                      ? "bg-[#3a0842]"
                      : "hover:bg-gray-100 dark:hover:bg-[#3a0842]"
                  } group`}
                  onClick={() => setSelectedSubject("Flag")}
                >
                  <CiFlag1 className="text-xl text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Flag
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <button
            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-100 dark:hover:bg-[#3a0842] group mb-5 ml-4 cursor-pointer"
            onClick={() => {
              localStorage.clear();
              return navigate("/");
            }}
          >
            <CgLogOut className="text-3xl text-gray-400 group-hover:text-white" />
            <span className="flex-1 ms-1 whitespace-nowrap">LogOut</span>
          </button>
        </div>
        <Storage selectedSubject={selectedSubject} />
      </div>
    </>
  );
};

export default SideBar;
