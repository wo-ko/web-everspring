"use client";
import React from "react";
import Image from "next/image";
type ImageLogoProps = {
  obj?: { image: string }[];
};

export default function ImageLogo({ obj }: ImageLogoProps) {
  if (!obj || obj.length === 0) return null;

  const images = obj.map((o) => o.image);

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8 md:my-10">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`image-logo-${i}`}
          width={150}   // ค่าใหญ่สุดของ md
          height={150}  // ให้เป็นสี่เหลี่ยมจัตุรัส
          className="w-full max-w-[100px] sm:max-w-[120px] md:max-w-[150px] h-auto object-contain"
          unoptimized 
        />
      ))}
    </div>
  );

}
