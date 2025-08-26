// foo-ter.tsx
"use client";

import { useThemeContext } from "@app/context/theme-context";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["200", "400"],
});

const fontMix = `${notoSansThai.className}`;

const Footer = () => {
  const { lang } = useThemeContext();

  const currentYear = new Date().getFullYear();

  const texts = {
    company: lang === "th" ? "EVERSPRING AGROCHEM" : "EVERSPRING AGROCHEM",
    address:
      lang === "th"
        ? "ที่อยู่บริษัท เอเวอร์สปริง อโกรเคม จำกัด \n 388/70 ถนนนวลจันทร์ แขวงนวลจันทร์ \n เขตบึงกุ่ม กรุงเทพมหานคร 10230 \n โทร 02-3638560 โทรสาร 02-0420860"
        : "Everspring Agrochem Co., Ltd. \n 388/70 Nuanchan Road, Nuanchan Subdistrict, \n Bueng Kum District, Bangkok 10230, Thailand \n Tel : 02-3638560 Fax : 02-0420860",
    hours:
      lang === "th" ? "เวลาทำการ : 08.00-17.30" : "Working hours: 08.00-17.30",
    menu1:
      lang === "th"
        ? [
            { path: "about", label: "เกี่ยวกับเรา" },
            { path: "company", label: "บริษัทในเครือ" },
            // { path: "product", label: "ผลิตภัณฑ์" },
          ]
        : [
            { path: "about", label: "About Us" },
            { path: "company", label: "Our Company" },
            // { path: "product", label: "Products" },
          ],
    menu2:
      lang === "th"
        ? [
            { path: "news", label: "ข่าวสาร" },
            { path: "contact", label: "ติดต่อ" },
            // { path: "privacy-policies", label: "Privacy Policies" },
          ]
        : [
            { path: "news", label: "News" },
            { path: "contact", label: "Contact" },
            // { path: "privacy-policies", label: "Privacy Policies" },
          ],
    copyright:
      lang === "th"
        ? `© ${currentYear} PBL DevTeam. สงวนลิขสิทธิ์ทุกประการ`
        : `© ${currentYear} PBL DevTeam. All rights reserved`,
  };

  return (
    <footer
      className={`${fontMix} bg-white text-gray-700 py-10 px-5 border-t border-gray-100 flex flex-col items-center`}
    >
      <div className="flex flex-wrap justify-between max-w-screen-xl w-full mb-8 lg:mb-12">
        {/* Company Info */}
        <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
          <h3 className="text-black text-lg font-bold mb-4">{texts.company}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-1">
            {texts.address.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <p className="text-gray-600 text-sm">{texts.hours}</p>
        </div>

        {/* Menu 1 */}
        <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
          <ul className="list-none p-0 m-0 space-y-2">
            {texts.menu1.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                <a
                  href={`/${lang}/${item.path}`}
                  className="text-gray-600 text-base transition-colors duration-300 hover:text-black"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu 2 */}
        <div className="flex-1 min-w-[200px] mb-5 pr-5 md:pr-0 md:mr-5">
          <ul className="list-none p-0 m-0 space-y-2">
            {texts.menu2.map((item, idx) => (
              <li key={idx} className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                <a
                  href={`/${lang}/${item.path}`}
                  className="text-gray-600 text-base transition-colors duration-300 hover:text-black"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full text-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-200">
        <p>{texts.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
