"use client";
import React from "react";
import { useThemeContext } from "@app/context/theme-context";

export default function PTagTitle(props: { text?: string }) {
  const { themeColor1 } = useThemeContext();

  return (
    <div className="flex justify-center items-center text-center mt-4 sm:mt-10 md:mt-14 lg:mt-17 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <p
        className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        style={{ color: themeColor1 || "#323296" }}
      >
        {props.text}
      </p>
    </div>
  );
}
