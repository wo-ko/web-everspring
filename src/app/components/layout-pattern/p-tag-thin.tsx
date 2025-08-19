"use client";
import React from "react";

export default function PTagThin(props: { text?: string }) {
  return (
    <div className="w-full max-w-3xl mx-auto flex justify-center px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-12">
      <p
        className="font-thin text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 text-center break-words"
        style={{ wordWrap: "break-word", hyphens: "auto" }}
      >
        {props.text}
      </p>
    </div>
  );
}
