import React from "react";

type ImageLeftTextBlockProps = {
  obj: {
    image: string;
    title?: string;
    text: string;
  }[];
};

export default function ImageLeftTextBlock({ obj }: ImageLeftTextBlockProps) {
  if (!obj || obj.length === 0) return null;

  const { image, title, text } = obj[0];

  return (
    <section className="py-16 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-6">
        {/* รูปภาพด้านซ้าย */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={image}
            alt={title || "image"}
            className="w-full max-w-[400px] object-contain shadow-sm"
          />
        </div>

        {/* ข้อความด้านขวา */}
        <div className="md:w-1/2">
          {title && (
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">
              {title}
            </h2>
          )}
          <p className="text-gray-700 text-lg md:text-base leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
