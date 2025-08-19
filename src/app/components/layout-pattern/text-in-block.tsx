"use client";
import React from "react";
import "@fontsource/inter";
import { useThemeContext } from "@app/context/theme-context";

type TextInBlockProps = {
  text?: string;
};

export default function TextInBlock({ text }: TextInBlockProps) {
  const { themeColor1 } = useThemeContext();

  const mainColor = themeColor1 || "#0286C2";
  const bgColor = "#f5f7fa"; // สีพื้นหลังอ่อน

  return (
    <div className="flex flex-col items-center my-12 sm:my-16 md:my-20 px-4 sm:px-6 md:px-8">
      <div
        className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl rounded-2xl p-6 sm:p-10 md:p-16 text-center border 
             break-words relative overflow-hidden"
        style={{
          backgroundColor: bgColor,
          borderColor: mainColor,
          borderWidth: "1px",
        }}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(0,0,0,0.02) 12px,rgba(0,0,0,0.02) 24px)] rounded-2xl pointer-events-none"></div>

        <p
          className="relative font-inter text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide"
          style={{ color: mainColor }}
        >
          {text?.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
