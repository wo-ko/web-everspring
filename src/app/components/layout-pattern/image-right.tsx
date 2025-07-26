import React from "react";

type ImageRightTextBlockProps = {
  obj: {
    image: string;
    title?: string;
    text: string;
  }[];
};

export default function ImageRightTextBlock({ obj }: ImageRightTextBlockProps) {
  if (!obj || obj.length === 0) return null;

  const { image, title, text } = obj[0];

  return (
    <div className="flex flex-col md:flex-row-reverse items-center gap-6 max-w-6xl mx-auto p-6">
      {/* รูปภาพด้านขวา */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={image}
          alt={title || "image"}
          className="w-full max-w-[400px] object-contain rounded"
        />
      </div>

      {/* ข้อความด้านซ้าย */}
      <div className="md:w-1/2">
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        <p className="text-gray-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
