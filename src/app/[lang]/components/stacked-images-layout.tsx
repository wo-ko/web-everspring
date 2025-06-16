import React from "react";

interface StackedImagesLayoutProps {
  title?: string;
  content: string | string[];
  subContent?: string;
  subContentColor?: string;
  subContentFontSize?: string;
  subContentBackground?: "transparent" | "border-only" | "solid";
  images?: string[];
  imageSize?: string;
  className?: string;
  titleColor?: string;
  titleAlign?: "left" | "center" | "right";
  contentAlign?: "left" | "center" | "right";
  imageGapX?: string;
  imageGapY?: string;
  imagePosition?: "top" | "middle" | "bottom";
}

export default function StackedImagesLayout({
  title,
  content,
  subContent,
  subContentColor = "#323296",
  subContentFontSize = "text-xl",
  subContentBackground = "solid",
  images = [],
  imageSize = "w-24 h-24",
  className = "",
  titleColor = "#323296",
  titleAlign = "center",
  contentAlign = "center",
  imageGapX = "gap-x-8",
  imageGapY = "gap-y-6",
  imagePosition = "bottom",
}: StackedImagesLayoutProps) {
  const hasImages = images.length > 0;

  const renderImages = () => (
    <div className={`flex flex-wrap justify-center ${imageGapX} ${imageGapY}`}>
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`${imageSize} flex items-center justify-center rounded-md shadow-sm`}
        >
          <img
            src={src}
            alt={`image-${idx}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ))}
    </div>
  );

  const titleAlignClass = {
    left: "self-start text-left p-4",
    center: "self-center text-center p-4",
    right: "self-end text-right p-4",
  }[titleAlign];

  const contentAlignClass = {
    left: "text-left self-start p-4",
    center: "text-center self-center p-4",
    right: "text-right self-end p-4",
  }[contentAlign];

  const contentLines =
    typeof content === "string" ? content.split("\n") : content;

  return (
    <div className={`flex flex-col items-center gap-12 my-8 ${className}`}>
      {hasImages && imagePosition === "top" && renderImages()}

      {title && (
        <h2
          className={`text-2xl font-semibold ${titleAlignClass}`}
          style={{ color: titleColor || "#323296" }}
        >
          {title}
        </h2>
      )}

      {hasImages && imagePosition === "middle" && renderImages()}
      {contentLines.length > 1 ? (
        <div
          className={`text-gray-700 max-w-xl whitespace-pre-line break-words leading-relaxed ${contentAlignClass}`}
        >
          {contentLines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 max-w-xl whitespace-normal break-words leading-relaxed">
          {contentLines[0]}
        </p>
      )}

      {subContent && (
        <div
          className={`rounded-lg p-4 shadow-sm max-w-xl text-center ${
            subContentBackground === "transparent"
              ? ""
              : "border border-gray-300"
          } ${
            subContentBackground === "solid" ? "bg-white" : "bg-transparent"
          }`}
        >
          <p
            className={`whitespace-pre-line break-words leading-relaxed ${subContentFontSize}`}
            style={{ color: subContentColor || "#323296" }}
          >
            {subContent}
          </p>
        </div>
      )}

      {hasImages && imagePosition === "bottom" && renderImages()}
    </div>
  );
}
