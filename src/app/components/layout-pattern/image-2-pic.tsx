"use client";
import React from "react";

type ImagePicProps = {
  obj?: { image: string }[];
};

export default function Image2Pic({ obj }: ImagePicProps) {
  if (!obj || obj.length === 0) return null;

  const images = obj.map((o) => o.image);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-12 max-w-6xl mx-auto">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`image-${i}`}
          className="w-full sm:w-[48%] md:w-[30%] h-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      ))}
    </div>
  );
}
