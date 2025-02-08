import React from 'react';
import Chapter from './Chapter';
import { MdManageSearch } from "react-icons/md";
import Flag from './Flag'; // Importing the Flag component

const Storage = ({ selectedSubject }) => {
  return (
    <>
      <div className="w-[50%] h-screen flex flex-col gap-4 justify-start items-center overflow-hidden">
          <div className="bg-[#240934] font-bold rounded-none z-50 border-none p-4 w-full flex justify-between items-center text-white">
            Storage
            <MdManageSearch className='text-2xl'/>
          </div>
          {selectedSubject === "flags" ? <Flag /> : <Chapter selectedSubject={selectedSubject} />}
      </div>
    </>
  );
}

export default Storage;