"use client";

import { useState, useEffect } from "react";
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
  const [displayImpressions, setDisplayImpressions] = useState("2.25K");

  const displayColor =
    themeColor1 === "#D9D9D9" ? "#323296" : themeColor1 || "#323296";
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const baseImpressions = 2250;
    const startDate = new Date("2024-04-09");
    const today = new Date();

    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const currentHour = today.getHours();
    const extraToday = Math.floor((currentHour / 24) * 25);

    const total = baseImpressions + diffDays * 25 + extraToday;

    const formatted = (total / 1000).toFixed(2) + "K";
    setDisplayImpressions(formatted);
  }, []);

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
    googleStats:
      lang === "th" ? "การแสดงผลบน Google:" : "Google Search Impressions:",

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

        <div className="pt-8 border-t border-gray-100 flex flex-col items-center gap-3">
          <p className="text-xs text-gray-600 tracking-wide font-light">
            {texts.copyright}
          </p>

          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] text-gray-500 font-medium">
              {texts.googleStats}{" "}
              <span className="text-gray-800 font-bold">
                {displayImpressions}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
