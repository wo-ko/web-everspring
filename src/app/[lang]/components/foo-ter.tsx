// // foo-ter.tsx
// "use client";

// import { useThemeContext } from "@app/context/theme-context";
// import { Noto_Sans_Thai } from "next/font/google";

// const notoSansThai = Noto_Sans_Thai({
//   subsets: ["thai"],
//   weight: ["200", "400"],
// });

// const fontMix = `${notoSansThai.className}`;

// const Footer = () => {
//   const { lang } = useThemeContext();

//   const currentYear = new Date().getFullYear();

//   const texts = {
//     company: lang === "th" ? "EVERSPRING AGROCHEM" : "EVERSPRING AGROCHEM",
//     address:
//       lang === "th"
//         ? "ที่อยู่บริษัท เอเวอร์สปริง อโกรเคม จำกัด \n 388/70 ถนนนวลจันทร์ แขวงนวลจันทร์ \n เขตบึงกุ่ม กรุงเทพมหานคร 10230 \n โทร 02-3638560 โทรสาร 02-0420860"
//         : "Everspring Agrochem Co., Ltd. \n 388/70 Nuanchan Road, Nuanchan Subdistrict, \n Bueng Kum District, Bangkok 10230, Thailand \n Tel : 02-3638560 Fax : 02-0420860",
//     hours:
//       lang === "th" ? "เวลาทำการ : 08.30-17.30" : "Working hours: 08.30-17.30",
//     menu1:
//       lang === "th"
//         ? [
//             { path: "about", label: "เกี่ยวกับเรา" },
//             { path: "company", label: "บริษัทในเครือ" },
//             // { path: "product", label: "ผลิตภัณฑ์" },
//           ]
//         : [
//             { path: "about", label: "About Us" },
//             { path: "company", label: "Our Company" },
//             // { path: "product", label: "Products" },
//           ],
//     menu2:
//       lang === "th"
//         ? [
//             { path: "news", label: "ข่าวสาร" },
//             { path: "contact", label: "ติดต่อ" },
//             // { path: "privacy-policies", label: "Privacy Policies" },
//           ]
//         : [
//             { path: "news", label: "News" },
//             { path: "contact", label: "Contact" },
//             // { path: "privacy-policies", label: "Privacy Policies" },
//           ],
//     copyright:
//       lang === "th"
//         ? `© ${currentYear} Everspring Agrochem. สงวนลิขสิทธิ์ทุกประการ`
//         : `© ${currentYear} Everspring Agrochem. All rights reserved`,
//   };

//   return (
//     <footer
//       className={`${fontMix} bg-white text-gray-700 py-10 px-5 border-t border-gray-100 flex flex-col items-center`}
//     >
//       <div className="flex flex-wrap justify-between max-w-screen-xl w-full mb-8 lg:mb-12">
//         <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
//           <h3 className="text-black text-lg font-bold mb-4">{texts.company}</h3>
//           <p className="text-gray-600 text-sm leading-relaxed mb-1">
//             {texts.address.split("\n").map((line, i) => (
//               <span key={i}>
//                 {line}
//                 <br />
//               </span>
//             ))}
//           </p>
//           <p className="text-gray-600 text-sm">{texts.hours}</p>
//         </div>

//         {/* Menu 1 */}
//         <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
//           <ul className="list-none p-0 m-0 space-y-2">
//             {texts.menu1.map((item, idx) => (
//               <li key={idx} className="flex items-center">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
//                 <a
//                   href={`/${lang}/${item.path}`}
//                   className="text-gray-600 text-base transition-colors duration-300 hover:text-black"
//                 >
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Menu 2 */}
//         <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
//           <ul className="list-none p-0 m-0 space-y-2">
//             {texts.menu2.map((item, idx) => (
//               <li key={idx} className="flex items-center">
//                 <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
//                 <a
//                   href={`/${lang}/${item.path}`}
//                   className="text-gray-600 text-base transition-colors duration-300 hover:text-black"
//                 >
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="w-full text-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-200">
//         <p>{texts.copyright}</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";

import { useThemeContext } from "@app/context/theme-context";
import { Noto_Sans_Thai } from "next/font/google";
import { MapPin, Phone, Printer, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500", "700"],
});

const Footer = () => {
  const { lang, themeColor1 } = useThemeContext();
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#323296" : themeColor1 || "#323296";
  const currentYear = new Date().getFullYear();

  const texts = {
    company: "EVERSPRING AGROCHEM",
    address:
      lang === "th"
        ? "388/70 ถนนนวลจันทร์ แขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพมหานคร 10230"
        : "388/70 Nuanchan Road, Nuanchan Subdistrict, Bueng Kum District, Bangkok 10230, Thailand",
    tel: "02-3638560",
    fax: "02-0420860",
    hours:
      lang === "th"
        ? "เวลาทำการ : 08.30 - 17.30"
        : "Working hours: 08.30 - 17.30",
    quickLinks: lang === "th" ? "ข้อมูลองค์กร" : "Corporate Info",

    menu1:
      lang === "th"
        ? [
            { path: "about", label: "เกี่ยวกับเรา" },
            { path: "company", label: "บริษัทในเครือ" },
          ]
        : [
            { path: "about", label: "About Us" },
            { path: "company", label: "Our Company" },
          ],
    menu2:
      lang === "th"
        ? [
            { path: "news", label: "ข่าวสารและกิจกรรม" },
            { path: "contact", label: "ติดต่อเรา" },
          ]
        : [
            { path: "news", label: "News & Activities" },
            { path: "contact", label: "Contact Us" },
          ],
    copyright:
      lang === "th"
        ? `© ${currentYear} Everspring Agrochem. สงวนลิขสิทธิ์ทุกประการ`
        : `© ${currentYear} Everspring Agrochem. All rights reserved`,
  };

  return (
    <footer
      className={`${notoSansThai.className} bg-white border-t border-gray-100 pt-16 pb-8`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <h3
              className="text-2xl font-black tracking-tight"
              style={{ color: displayColor }}
            >
              {texts.company}
            </h3>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 mt-1 flex-shrink-0"
                  style={{ color: displayColor }}
                />
                <p className="text-sm leading-relaxed">{texts.address}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" style={{ color: displayColor }} />
                  <span className="text-sm">{texts.tel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Printer
                    className="w-4 h-4"
                    style={{ color: displayColor }}
                  />
                  <span className="text-sm">{texts.fax}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm italic text-gray-400">
                  {texts.hours}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-2">
              {texts.quickLinks}
            </h4>
            <ul className="space-y-4">
              {texts.menu1.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${lang}/${item.path}`}
                    className="group flex items-center text-gray-600 hover:text-black transition-all duration-300"
                  >
                    <ChevronRight className="w-0 h-4 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all text-blue-500" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:pt-11">
            <ul className="space-y-4">
              {texts.menu2.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/${lang}/${item.path}`}
                    className="group flex items-center text-gray-600 hover:text-black transition-all duration-300"
                  >
                    <ChevronRight className="w-0 h-4 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all text-blue-500" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs text-gray-600 tracking-wide font-light">
            {texts.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
