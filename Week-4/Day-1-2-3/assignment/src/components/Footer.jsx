import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="mt-12 padding-horizontal space-y-6 mb-12">
      <div className="flex items-center max-xs:flex-col max-xs:gap-4">
        <div className="w-full xs:px-2 px-1 mt-2 flex xs:gap-4 gap-2 items-center max-xs:justify-center">
          <img src={logo} className="w-10 h-10 " alt="" />
          <p className="xs:text-2xl text-lg font-bold capitalize">Yorfy</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer hover:bg-white hover:text-primaryBg text-white transition-all w-10 h-10 rounded-full border border-white flex justify-center items-center">
            <TiSocialFacebook size={26} />
          </div>
          <div className="cursor-pointer hover:bg-white hover:text-primaryBg text-white transition-all w-10 h-10 rounded-full border border-white flex justify-center items-center">
            <FaInstagram size={26} />
          </div>
          <div className=" cursor-pointer hover:bg-white hover:text-primaryBg text-white transition-all w-10 h-10 rounded-full border border-white flex justify-center items-center">
            <FaLinkedinIn size={26} />
          </div>
          <div className="cursor-pointer hover:bg-white hover:text-primaryBg text-white transition-all w-10 h-10 rounded-full border border-white flex justify-center items-center">
            <FaYoutube size={26} />
          </div>
        </div>
      </div>
      <div>
        <div className="border-primary border w-full" />
      </div>
      <div className="flex items-center justify-between max-sm:flex-col max-xs:gap-4 max-sm:text-center">
        <p className="text-secondaryText">
          © 2022 Yorfy Template • All Rights Reserved
        </p>
        <p className="text-secondaryText">Made With Love by Groweb Studio</p>
      </div>
    </footer>
  );
}
