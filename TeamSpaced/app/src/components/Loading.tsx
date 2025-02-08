import React from "react";
import { Preloader } from "konsta/react";

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 z-50 flex justify-center items-center">
      <div className="w-72 h-18 bg-gray-100 flex flex-column gap-10 justify-center items-center">
        <Preloader className="text-main-600" />
        <p className="text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
