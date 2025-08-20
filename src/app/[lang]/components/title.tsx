"use client";
import { useThemeContext } from "@app/context/theme-context";
import BtnChangeLanguage from "./btn-change-language";
import BtnColorPicker from "./btn-color-picker";
import { Phone } from "lucide-react";

export default function Title() {
  const { changeThemeColor1 } = useThemeContext();

  return (
    <div className="px-4 md:px-16 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="text-center md:text-left" style={{ color: "#323296", fontWeight: "bolder" }}>
        <div className="text-base md:text-lg">Everspring Agrochem Co.,Ltd.</div>
        <div className="text-sm md:text-base">บริษัท เอเวอร์สปริง อโกรเคม จำกัด</div>
      </div>
      <div className="hidden md:flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/dyg6r8pec/image/upload/w_130,h_100,c_fit/v1749023798/logo_everspring-01-Photoroom_lq2qb3.png"
          alt="Logo"
          className="w-[100px] h-auto"
        />
      </div>
      <div className="flex flex-row justify-between md:justify-end items-center gap-2 md:gap-4 text-sm md:text-base">
        <div className="flex items-center gap-1 text-[#323296] font-bold">
          <Phone size={18} />
          <span>02-363-8560</span>
        </div>
        <div className="flex gap-1">
          <BtnColorPicker color="#D9D9D9" changeThemeColor={changeThemeColor1} />
          <BtnColorPicker color="#323296" changeThemeColor={changeThemeColor1} />
          <BtnColorPicker color="#009646" changeThemeColor={changeThemeColor1} />
          <BtnChangeLanguage />
        </div>
        
      </div>
    </div>
  );
}
