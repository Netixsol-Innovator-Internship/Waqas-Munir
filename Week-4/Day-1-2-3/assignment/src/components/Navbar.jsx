import { IoMenu } from "react-icons/io5";

import Button from "./ui/Button";
import Links from "./Links";
import logo from "../assets/Logo.png";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-primaryBg w-full flex justify-between items-center h-[88px] padding-horizontal relative">
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 items-center">
          <img src={logo} alt="" className="h-10 w-10" />
          <p className="font-bold text-2xl text-white uppercase">Yorfy</p>
        </div>
        <div className="ms-10 md:block hidden">
          <ul className="flex text-white gap-6 text-sm">
            <Links />
          </ul>
        </div>
      </div>
      <div className="md:block hidden">
        <Button text="Join Us" />
      </div>
      <div className="md:hidden block relative">
        {!openMenu && (
          <IoMenu
            size={28}
            color="white"
            className="cursor-pointer"
            onClick={() => setOpenMenu(true)}
          />
        )}
      </div>
      <Sidebar isOpen={openMenu} onClose={() => setOpenMenu(false)} />
    </header>
  );
}
