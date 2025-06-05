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
  imageGapX?: string;
  imageGapY?: string;
  imagePosition?: "top" | "middle" | "bottom";
}

export default function StackedImagesLayout({
  title,
  content,
  subContent,
  subContentColor = "#333",
  subContentFontSize = "text-xl",
  subContentBackground = "solid",
  images = [],
  imageSize = "w-24 h-24",
  className = "",
  titleColor = "#fff",
  titleAlign = "center",
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
    left: "self-start text-left",
    center: "self-center text-center",
    right: "self-end text-right",
  }[titleAlign];

  const contentLines =
    typeof content === "string" ? content.split("\n") : content;

  return (
    <div className={`flex flex-col items-center gap-4 my-8 ${className}`}>
      {hasImages && imagePosition === "top" && renderImages()}

      {title && (
        <h2
          className={`text-2xl font-semibold ${titleAlignClass}`}
          style={{ color: titleColor }}
        >
          {title}
        </h2>
      )}

      {hasImages && imagePosition === "middle" && renderImages()}

      {/* {contentLines.length > 1 ? (
        <ol className="text-gray-700 max-w-xl list-decimal list-inside space-y-1 text-left">
          {contentLines.map((line, idx) => (
            <li key={idx} className="break-words leading-relaxed">
              {line}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-gray-700 max-w-xl whitespace-normal break-words leading-relaxed">
          {contentLines[0]}
        </p>
      )} */}

      {contentLines.length > 1 ? (
        <div className="text-center text-gray-700 max-w-xl whitespace-pre-line break-words leading-relaxed">
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
            style={{ color: subContentColor }}
          >
            {subContent}
          </p>
        </div>
      )}

      {hasImages && imagePosition === "bottom" && renderImages()}
    </div>
  );
}
