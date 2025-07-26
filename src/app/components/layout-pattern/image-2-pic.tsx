import React from "react";

type ImagePicProps = {
  obj?: { image: string }[];
};

function Image2Pic({ obj }: ImagePicProps) {
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
          style={{ maxWidth: 500, height: "auto", objectFit: "contain" }}
        />
      ))}
    </div>
  );
}

export default Image2Pic;
