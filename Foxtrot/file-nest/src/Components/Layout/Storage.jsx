import React from 'react';
import Chapter from './Chapter';

const Storage = ({ selectedSubject }) => {
  return (
    <>
      <div className="w-[55%] h-screen flex flex-col gap-4 justify-start items-center overflow-hidden">
          <div className="bg-[#240934] font-bold rounded-none z-50 border-none p-4 w-full text-white">Storage</div>
          <Chapter selectedSubject={selectedSubject} />
      </div>
    </>
  );
}

export default Storage;