import React from "react";
type ImageLogoProps = {
  obj?: { image: string }[];
};

export default function ImageLogo({ obj }: ImageLogoProps) {
  if (!obj || obj.length === 0) return null;

  const images = obj.map((o) => o.image);

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`image-logo-${i}`}
          style={{ maxWidth: 150, height: "auto", objectFit: "contain" }}
        />
      ))}
    </div>
  );
}