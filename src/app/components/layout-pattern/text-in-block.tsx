// "use client";
// import React from "react";
// import "@fontsource/inter";
// import { useThemeContext } from "@app/context/theme-context";

// type TextInBlockProps = {
//   text?: string;
// };

// export default function TextInBlock({ text }: TextInBlockProps) {
//   const { themeColor1 } = useThemeContext();
//   const displayColor =
//     themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

//   const mainColor = themeColor1 || "#0286C2";
//   const bgColor = "#f5f7fa"; // สีพื้นหลังอ่อน

//   return (
//     <div className="flex flex-col items-center my-12 sm:my-16 md:my-20 px-4 sm:px-6 md:px-8">
//       <div
//         className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl rounded-2xl p-6 sm:p-10 md:p-16 text-center border
//              break-words relative overflow-hidden"
//         style={{
//           backgroundColor: bgColor,
//           borderColor: mainColor,
//           borderWidth: "1px",
//         }}
//       >
//         <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent 12px,rgba(0,0,0,0.02) 12px,rgba(0,0,0,0.02) 24px)] rounded-2xl pointer-events-none"></div>

//         <p
//           className="relative font-inter text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide"
//           style={{ color: displayColor, lineHeight: "1.5em" }}
//         >
//           {text?.split("\n").map((line, i) => (
//             <React.Fragment key={i}>
//               {line}
//               <br />
//             </React.Fragment>
//           ))}
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import "@fontsource/inter";
import { useThemeContext } from "@app/context/theme-context";

type TextInBlockProps = {
  text?: string;
};

export default function TextInBlock({ text }: TextInBlockProps) {
  const { themeColor1 } = useThemeContext();

  const mainColor = themeColor1 || "#0286C2";
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

  return (
    <div className="relative w-full py-6 md:py-10 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div
          className="absolute top-0 left-10 w-64 h-64 blur-[100px] rounded-full opacity-[0.05]"
          style={{ backgroundColor: mainColor }}
        />
        <div
          className="absolute bottom-0 right-10 w-80 h-80 blur-[100px] rounded-full opacity-[0.05]"
          style={{ backgroundColor: mainColor }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative group">
        {" "}
        <div
          className="relative z-10 rounded-[1.5rem] p-8 sm:p-12 md:p-16 
                     backdrop-blur-sm bg-white/70
                     border border-white/50
                     shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]
                     transition-all duration-700 ease-out
                     hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)]"
          style={{
            borderColor: `${mainColor}20`,
          }}
        >
          <div
            className="absolute top-6 left-6 w-8 h-8 border-t border-l opacity-30"
            style={{ borderColor: mainColor }}
          />
          <div
            className="absolute bottom-6 right-6 w-8 h-8 border-b border-r opacity-30"
            style={{ borderColor: mainColor }}
          />

          <div className="flex justify-center mb-6">
            <span
              className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-white/50 shadow-sm border"
              style={{ color: mainColor, borderColor: `${mainColor}20` }}
            >
              Highlight
            </span>
          </div>

          <div className="relative">
            <span
              className="absolute -top-6 -left-4 text-6xl font-serif opacity-[0.1] select-none pointer-events-none"
              style={{ color: mainColor }}
            >
              “
            </span>

            <p
              className="relative font-inter font-semibold tracking-tight text-center italic"
              style={{
                color: displayColor,
                lineHeight: "1.4",
                fontSize: "clamp(1.25rem, 3vw, 2.25rem)", // ลดขนาดลงเล็กน้อยให้ดูหรู
              }}
            >
              {text?.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== text.split("\n").length - 1 && (
                    <span className="block mb-4" />
                  )}
                </React.Fragment>
              ))}
            </p>

            <span
              className="absolute -bottom-10 -right-4 text-6xl font-serif opacity-[0.1] select-none pointer-events-none"
              style={{ color: mainColor }}
            >
              ”
            </span>
          </div>
        </div>
        <div className="absolute inset-x-6 -bottom-4 h-16 bg-white/30 rounded-[1.5rem] -z-10 blur-sm border border-black/5" />
      </div>
    </div>
  );
}
