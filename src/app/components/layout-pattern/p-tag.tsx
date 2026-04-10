"use client";
import React from "react";
import { useThemeContext } from "@app/context/theme-context";

export default function PTagTitle(props: { text?: string }) {
  const { themeColor1 } = useThemeContext();
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";
  return (
    <div className="flex justify-center items-center text-center mt-4 sm:mt-10 md:mt-14 lg:mt-17 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <p
        className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ color: displayColor }}
      >
        {props.text}
      </p>
    </div>
  );
}
