"use client";
import React from "react";
import { useThemeContext } from "@app/context/theme-context";

export default function PTagTitle(props: { text?: string }) {
  const { themeColor1 } = useThemeContext();

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
      <p
        className="font-black pt-3"
        style={{ color: themeColor1 || "inherit" }}
      >
        {props.text}
      </p>
    </div>
  );
}
