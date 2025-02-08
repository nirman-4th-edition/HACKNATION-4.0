import React, { useState } from "react";
import { Page, Progressbar } from "konsta/react";
import bgblur from "./bgblur.png";

interface Props {
  progress: number;
  className?: string;
  status: boolean;
}

const Splash = ({ progress, className, status }: Props) => {
  const display = status ? "block" : "hidden";

  return (
    <Page
      className={`h-screen w-screen absolute z-50 ${
        className ? className : ""
      } ${display}`}
    >
      <img
        src={bgblur}
        height={720}
        width={720}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-full h-auto absolute bottom-0">
        <Progressbar className="k-color-brand-green h-2" progress={progress} />
      </div>
    </Page>
  );
};

export default Splash;
