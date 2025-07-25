import React from "react";

type ImagePicProps = {
  obj?: { image: string }[]; // ต้องการ 3 รูป: ซ้าย 2 + ขวา 1
};

function Image3Pic({ obj }: ImagePicProps) {
  if (!obj || obj.length < 3) return null;

  const [leftTop, leftBottom, right] = obj;

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* ซ้าย: 2 รูปแนวตั้ง */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <img
          src={leftTop.image}
          alt="left-top"
          style={{ width: 350, height: "auto", objectFit: "contain" }}
        />
        <img
          src={leftBottom.image}
          alt="left-bottom"
          style={{ width: 350, height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* ขวา: 1 รูปใหญ่ */}
      <img
        src={right.image}
        alt="right"
        style={{ width: 450, height: "auto", objectFit: "contain" }}
      />
    </div>
  );
}

export default Image3Pic;
