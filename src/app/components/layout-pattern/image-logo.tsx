"use client";
import React from "react";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

type ImageLogoProps = {
  obj?: { image: string }[];
};

export default function ImageLogo({ obj }: ImageLogoProps) {
  if (!obj || obj.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 my-6 sm:my-8 md:my-10">
      {obj.map((o, i) => {
        const src = renderImageUrl(o.image);
        if (!src) return null;

        return (
          <Image
            key={i}
            src={src}
            alt={`image-logo-${i}`}
            width={150}
            height={150}
            className="w-full max-w-[100px] sm:max-w-[120px] md:max-w-[150px] h-auto object-contain"
            unoptimized
          />
        );
      })}
    </div>
  );
}
