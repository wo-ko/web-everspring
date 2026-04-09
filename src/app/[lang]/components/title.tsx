"use client";
import { useThemeContext } from "@app/context/theme-context";
import BtnChangeLanguage from "./btn-change-language";
import BtnColorPicker from "./btn-color-picker";
import { Phone } from "lucide-react";
import Image from "next/image";

export default function Title() {
  const { changeThemeColor1 } = useThemeContext();

  return (
    <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div
        className="text-center md:text-left"
        style={{ color: "#323296", fontWeight: "bolder" }}
      >
        <div
          className="
  text-[14px]      /* มือถือเล็ก */
  sm:text-[15px]   /* มือถือใหญ่ / iPhone Pro */
  md:text-[12px]   /* iPad / Tablet */
  lg:text-[15px]   /* Desktop ขนาดกลาง */
  xl:text-[15px]   /* Desktop / Widescreen */
  leading-relaxed
"
        >
          Everspring Agrochem Co.,Ltd.
        </div>
        <div
          className="
  text-[14px]      /* มือถือเล็ก */
  sm:text-[15px]   /* มือถือใหญ่ / iPhone Pro */
  md:text-[12px]   /* iPad / Tablet */
  lg:text-[15px]   /* Desktop ขนาดกลาง */
  xl:text-[15px]   /* Desktop / Widescreen */
  leading-relaxed
"
        >
          บริษัท เอเวอร์สปริง อโกรเคม จำกัด
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center">
        {/* <Image src="/public/icon/logo-everspring-solid-01.png" alt="Logo" width={100} className="h-auto" unoptimized/> */}
        <Image
          src="/icon/logo-everspring-solid-01.png"
          alt="Logo"
          width={100}
          height={100}
          className="h-auto"
          unoptimized
        />
      </div>
      {/* <div className="flex flex-row justify-between md:justify-end items-center gap-2 md:gap-4 text-sm">
        <div className="flex items-center gap-1 text-[#323296] font-bold">
          <Phone size={18} />
          <span>02-363-8560</span>
        </div>
        <div className="flex items-center gap-1">
          <BtnColorPicker
            color="#D9D9D9"
            changeThemeColor={changeThemeColor1}
          />
          <BtnColorPicker
            color="#323296"
            changeThemeColor={changeThemeColor1}
          />
          <BtnColorPicker
            color="#009646"
            changeThemeColor={changeThemeColor1}
          />
          <BtnChangeLanguage />
        </div>
      </div> */}

      <div className="flex flex-row justify-end items-center gap-6 py-2 text-sm">
        <a
          href="tel:023638560"
          className="flex items-center gap-2 text-[#323296] font-bold hover:opacity-75 transition-all duration-300 group"
        >
          <div className="bg-blue-50 p-1.5 rounded-full group-hover:bg-blue-100 transition-colors">
            <Phone size={14} className="text-[#323296]" />
          </div>
          <span className="tracking-tight">02-363-8560</span>
        </a>

        <div className="flex items-center gap-3">
          <div className="h-4 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

          <div className="hidden sm:flex items-center gap-1.5 border-r border-gray-200 pr-3">
            <BtnColorPicker
              color="#D9D9D9"
              changeThemeColor={changeThemeColor1}
            />
            <BtnColorPicker
              color="#323296"
              changeThemeColor={changeThemeColor1}
            />
            <BtnColorPicker
              color="#009646"
              changeThemeColor={changeThemeColor1}
            />
          </div>

          <div className="hover:scale-105 transition-transform">
            <BtnChangeLanguage />
          </div>
        </div>
      </div>
    </div>
  );
}
