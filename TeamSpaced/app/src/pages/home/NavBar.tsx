import { BellIcon } from "@heroicons/react/24/outline";
import { Icon } from "konsta/react";
import React from "react";
import person from "./person.png";

interface Props {
  name: string;
  address: string;
  addressVisible?: boolean;
}

const NavBar = ({ name, address, addressVisible }: Props) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 z-20 bg-transparent flex flex-row p-4 mt-2 items-center gap-1">
      <div className="flex-[2]">
        <div className="bg-white rounded-full w-14 h-14 flex justify-center items-center">
          <Icon material={<img src={person} alt="" />}></Icon>
        </div>
      </div>
      <div className="flex-[6]">
        <p className="font-semibold">{name}</p>
        <p className="font-light">{addressVisible ? address : ""}</p>
      </div>
      <div className="flex-[2] flex justify-center">
        <BellIcon className="w-8 text-black" />
      </div>
    </div>
  );
};

export default NavBar;
