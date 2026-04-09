// import React from "react";
// import Image from "next/image";
// type ImageLeftTextBlockProps = {
//     obj: {
//         image: string;
//         title?: string;
//         text: string;
//     }[];
// };

// export default function ContactPhone({ obj }: ImageLeftTextBlockProps) {
//     if (!obj || obj.length === 0) return null;

//     const { image, title, text } = obj[0];

//     return (
//         <div className="bg-gray-200 py-10 px-5 text-gray-700 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] border-t border-gray-300">
//             <div className="max-w-screen-xl mx-auto flex justify-between gap-10 flex-wrap">
//                 <div className="flex flex-col items-center flex-1 min-w-[250px] mb-8 md:mb-0">
//                     <div className="mb-5">
//                         {!image ? null :<Image
//                             src={image}
//                             alt="Logo"
//                             width={130}
//                             height={100}
//                             unoptimized
//                         />}
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
//                     <p className="text-base font-bold text-gray-800 mt-0">{text}</p>
//                 </div>
//             </div>
//         </div >
//     );
// }

"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { useThemeContext } from "@app/context/theme-context";

type ImageLeftTextBlockProps = {
  obj: {
    image: string;
    title?: string;
    text: string;
  }[];
};

export default function ContactPhone({ obj }: ImageLeftTextBlockProps) {
  const { themeColor1 } = useThemeContext();
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#323296" : themeColor1 || "#323296";

  if (!obj || obj.length === 0) return null;

  const { image, title, text } = obj[0];

  return (
    <div className="relative overflow-hidden bg-white border-y border-gray-100 py-12 px-6">
      {/* ลายน้ำจางๆ ด้านหลังเพิ่มความแพง */}
      <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
        <PhoneCall size={300} />
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* ส่วน Logo และคำโปรย */}
          <div className="flex flex-col md:flex-row items-center gap-6 flex-1 text-center md:text-left">
            {image && (
              <div className="relative group">
                <div className="absolute -inset-2 bg-gray-100 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500 opacity-50"></div>
                <Image
                  src={image}
                  alt="Company Logo"
                  width={140}
                  height={110}
                  className="relative object-contain"
                  unoptimized
                />
              </div>
            )}

            <div className="space-y-1">
              <h3
                className="text-lg md:text-xl font-medium tracking-wide uppercase opacity-70"
                style={{ color: displayColor }}
              >
                {title || "Contact Us"}
              </h3>
              <div className="h-1 w-12 bg-blue-500 mx-auto md:ml-0 rounded-full"></div>
            </div>
          </div>

          {/* ส่วนเบอร์โทรศัพท์ (Call to Action) */}
          <div className="flex-1 flex justify-center md:justify-end">
            <a
              href={`tel:${text.replace(/-/g, "")}`}
              className="group flex items-center gap-5 bg-gray-50 hover:bg-white border border-gray-200 p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse"
                style={{ backgroundColor: displayColor }}
              >
                <PhoneCall className="w-7 h-7 md:w-8 md:h-8" />
              </div>

              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Hotline 24/7
                </span>
                <span
                  className="text-2xl md:text-4xl font-black tracking-tighter"
                  style={{ color: displayColor }}
                >
                  {text}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
