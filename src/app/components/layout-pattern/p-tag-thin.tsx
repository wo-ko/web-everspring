"use client";
import React from "react";

export default function PTagThin(props: { text?: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "25px",
      }}
    >
      <p className="font-thin pt-3 whitespace-pre-line">{props.text}</p>
    </div>
  );
}
