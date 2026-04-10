// import React from "react";
// export default function ContactMaps(props: { text?: string }) {

//     return (
//         <div className="flex justify-center items-center w-[100%] h-72 rounded-lg overflow-hidden">
//             <iframe
//                 src={props?.text}
//                 className="w-full md:w-[70%] h-[100%] border border-slate-600 rounded-xl shadow-lg"
//                 style={{ border: 0 }}
//                 allowFullScreen={true}
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//             >
//             </iframe>
//         </div>

//     );
// }

"use client";

import React from "react";
import { MapPin } from "lucide-react";

export default function ContactMaps({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl shadow-blue-900/10 border-8 border-white">
          <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3 transition-transform duration-500 group-hover:scale-105">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Location
              </p>
              <p className="text-sm font-extrabold text-gray-800">
                สำนักงานใหญ่
              </p>
            </div>
          </div>

          <iframe
            src={text}
            className="w-full h-[350px] md:h-[500px] transition-all duration-700 ease-in-out contrast-[1.05] grayscale-[20%] group-hover:grayscale-0"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          />

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>

        <div className="mt-8 text-center">
          <a
            href={text} // หรือใส่เป็น Google Maps Direct Link
            target="_blank"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors text-sm uppercase tracking-wider"
          >
            {/* <span>ดูแผนที่ขนาดใหญ่</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg> */}
          </a>
        </div>
      </div>
    </section>
  );
}
