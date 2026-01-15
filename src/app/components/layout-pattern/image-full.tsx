"use client";
import React from "react";
import Image from "next/image";
export default function ImageFull(props: { image?: string }) {
  if (!props?.image) return null;

  return (
    <div className="w-full flex justify-center my-8 sm:my-10 md:my-12 px-4 sm:px-6 md:px-8">
  <Image
    src={props.image}
    alt=""
    className="w-full max-w-6xl h-auto object-contain"
    priority
    width={1920} 
    height={1080}
    unoptimized 
  />
</div>

  );
}
