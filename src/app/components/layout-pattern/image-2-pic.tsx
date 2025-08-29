"use client";
import React from "react";
import Image from "next/image";
type ImagePicProps = {
  obj?: { image: string }[];
};

export default function Image2Pic({ obj }: ImagePicProps) {
  if (!obj || obj.length === 0) return null;

  const images = obj.map((o) => o.image);

  return (
    <div className="flex flex-wrap justify-center gap-2 px-2 sm:px-4 md:px-6 my-6 sm:my-8 md:my-10 max-w-7xl mx-auto">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative w-[46.5%] aspect-[4/3] transition-transform duration-300 "
        >
          <Image
            src={src}
            alt={`image-${i}`}
            width={600}
            height={200}
            className="object-contain"
            unoptimized 
          />
        </div>
      ))}
    </div>

  );
}
