"use client";
import React from "react";

type ImagePicProps = {
  obj?: { image: string }[];
};

export default function Image2Pic({ obj }: ImagePicProps) {
  if (!obj || obj.length === 0) return null;

  const images = obj.map((o) => o.image);

  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 sm:px-4 md:px-6 my-6 sm:my-8 md:my-10 max-w-7xl mx-auto">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`image-${i}`}
          className="w-[46.5%] h-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      ))}
    </div>
  );
}
