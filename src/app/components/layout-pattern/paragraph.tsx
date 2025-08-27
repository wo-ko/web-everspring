import clsx from "clsx";
import React from "react";

export default function Paragraph(props: {
  text: string;
  customClass?: string;
}) {
  
  const highlightWords = [
    "บริษัทเอเวอร์สปริง",
    "อโกรเคม จำกัด",
    "บริษัท เอเวอร์สปริง อโกรเคม จำกัด",
    "กลุ่มบริษัทในเครือเอเวอร์สปริง",
    "Everspring Agrochem Co., Ltd",
    "The Everspring Group",
    "บริษัท เอเวอร์สปริง อโกรเคม จำกัด และ บริษัท เอฟ แอนด์ ดับบลิว อะโกรเคม จำกัด"
  ];

  const renderText = (text: string) => {
    const regex = new RegExp(`(${highlightWords.join("|")})`, "g");

    return text.split("\n").map((line, idx) => (
      <span key={idx} className="block">
        {line.split(regex).map((segment, i) =>
          highlightWords.includes(segment) ? (
            <span key={i} className="font-semibold">
              {segment}
            </span>
          ) : (
            segment
          )
        )}
      </span>
    ));
  };

  return (
    <p
      className={clsx(
        "whitespace-pre-line py-4 px-6 max-w-3xl mx-auto text-gray-800 leading-relaxed mb-6 sm:mb-8 md:mb-10 " +
          "text-sm sm:text-base md:text-lg tracking-normal font-regular",
        props.customClass
      )}
    >
      {renderText(props.text)}
    </p>
  );
}
