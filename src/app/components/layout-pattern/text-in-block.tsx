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
    <div className="relative w-full py-20 sm:py-32 px-4 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div
          className="absolute top-10 left-10 w-64 h-64 blur-[120px] rounded-full opacity-10"
          style={{ backgroundColor: mainColor }}
        />
        <div
          className="absolute bottom-10 right-10 w-80 h-80 blur-[120px] rounded-full opacity-10"
          style={{ backgroundColor: mainColor }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative group">
        <div
          className="relative z-10 rounded-[2.5rem] p-10 sm:p-16 md:p-24 
                     backdrop-blur-sm bg-white/80
                     border border-white
                     shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]
                     transition-all duration-700 ease-out
                     hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.15)]
                     hover:-translate-y-2"
          style={{
            borderColor: `${mainColor}20`,
          }}
        >
          <div
            className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 opacity-20 rounded-tl-xl"
            style={{ borderColor: mainColor }}
          />
          <div
            className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 opacity-20 rounded-br-xl"
            style={{ borderColor: mainColor }}
          />

          {/* <div className="flex justify-center mb-10">
            <span
              className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white shadow-sm border"
              style={{ color: mainColor, borderColor: `${mainColor}30` }}
            >
              Highlight
            </span>
          </div> */}

          <div className="relative">
            <span
              className="absolute -top-10 -left-6 text-8xl font-serif opacity-[0.08] select-none pointer-events-none"
              style={{ color: mainColor }}
            >
              “
            </span>

            <p
              className="relative font-inter font-semibold tracking-tight text-center italic"
              style={{
                color: displayColor,
                lineHeight: "1.5",
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              }}
            >
              {text?.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i !== text.split("\n").length - 1 && (
                    <span className="block mb-6" />
                  )}
                </React.Fragment>
              ))}
            </p>

            <span
              className="absolute -bottom-16 -right-6 text-8xl font-serif opacity-[0.08] select-none pointer-events-none"
              style={{ color: mainColor }}
            >
              ”
            </span>
          </div>
        </div>

        <div className="absolute inset-x-10 -bottom-6 h-20 bg-white/50 rounded-[2.5rem] -z-10 blur-sm border border-black/5" />
      </div>
    </div>
  );
}
