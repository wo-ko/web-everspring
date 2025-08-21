"use client";
import React from "react";

interface ImageItem {
  src: string;
  alt?: string;
}

interface ImageDisplayProps {
  images: ImageItem[];
  imageSize?: string; // เช่น "250x300"
  columns?: number; // เช่น 2, 3, 4
}

const parseImageSize = (size?: string) => {
  if (!size) return { width: "100%", height: "auto" };
  const [w, h] = size.split("x").map(Number);
  return {
    width: !isNaN(w) ? `${w}px` : "100%",
    height: !isNaN(h) ? `${h}px` : "auto",
  };
};

const getGridColsClass = (cols?: number) => {
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    default:
      return "grid-cols-2"; // default = 2 columns
  }
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  images,
  imageSize = "250x300",
  columns = 2,
}) => {
  const { width, height } = parseImageSize(imageSize); // eslint-disable-line @typescript-eslint/no-unused-vars

  const gridColsClass = getGridColsClass(columns);

  return (
    <div className={`grid ${gridColsClass}`}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className="flex justify-center items-center w-full"
          style={{ padding: "0.25rem" }}
        >
          <img
            src={img.src}
            alt={img.alt || `image-${idx}`}
            style={{
              // width,
              width: "70%",
              height,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
