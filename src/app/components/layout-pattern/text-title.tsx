"use client";
import React from "react";
import { useThemeContext } from "@app/context/theme-context";

export default function TextTitle(props: { text?: string }) {
  const { themeColor1 } = useThemeContext();

  return (
    <div className="flex items-center justify-center mt-6 mb-6 gap-4">
      {/* ขีดซ้ายสั้น */}
      <div className="w-12 h-[2px] bg-gray-300 rounded-full"></div>

      {/* ข้อความ */}
      <h2
        className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center leading-snug"
        style={{ color: themeColor1 || "#323296" }}
      >
        {props?.text}
      </h2>

      {/* ขีดขวาสั้น */}
      <div className="w-12 h-[2px] bg-gray-300 rounded-full"></div>
    </div>
  );
}
