"use client";
import React from "react";

type ImagePicProps = {
  obj?: { image: string }[]; // ต้องการ 3 รูป: ซ้าย 2 + ขวา 1
};

export default function Image3Pic({ obj }: ImagePicProps) {
  if (!obj || obj.length < 3) return null;

  const [leftTop, leftBottom, right] = obj;

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-start gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-16 max-w-6xl mx-auto">
      {/* Divider / ลูกเล่นตรงกลาง */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 opacity-30 transform -translate-x-1"></div>

      {/* ซ้าย: 2 รูปแนวตั้ง */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 md:w-1/2">
        <img
          src={leftTop.image}
          alt="left-top"
          className="w-full sm:max-w-[250px] md:max-w-[350px] h-auto object-contain mx-auto transition-transform duration-300 hover:scale-105 shadow-lg"
        />
        <img
          src={leftBottom.image}
          alt="left-bottom"
          className="w-full sm:max-w-[250px] md:max-w-[350px] h-auto object-contain mx-auto transition-transform duration-300 hover:scale-105 shadow-lg"
        />
      </div>

      {/* ขวา: 1 รูปใหญ่ */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={right.image}
          alt="right"
          className="w-full sm:max-w-[300px] md:max-w-[450px] h-auto object-contain transition-transform duration-300 hover:scale-105 shadow-lg"
        />
      </div>
    </div>
  );
}
