import { useThemeContext } from "@app/context/theme-context";
import React from "react";

interface SideImageLayoutProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  content: string;
  reverse?: boolean;
  imageWidth?: string;
  imageHeight?: string;
  className?: string;
}

export default function SideImageLayout({
  imageSrc,
  imageAlt = "",
  title,
  content,
  reverse = false,
  imageWidth = "w-full",
  imageHeight = "h-auto",
  className = "",
}: SideImageLayoutProps) {
  const { themeColor1 } = useThemeContext();
  return (
    <div
      className={`flex flex-wrap items-center gap-8 my-8 max-w-4xl mx-auto ${
        reverse ? "flex-row-reverse" : ""
      } ${className}`}
    >
      <div className="flex-1 min-w-[250px]">
        <h2 style={{color:`${themeColor1}`}} className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex-1 min-w-[250px]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`rounded-lg object-cover shadow-md ${imageWidth} ${imageHeight}`}
        />
      </div>
    </div>
  );
}
