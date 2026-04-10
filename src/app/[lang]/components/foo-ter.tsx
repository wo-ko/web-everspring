"use client";

import { useState, useEffect } from "react";
import { useThemeContext } from "@app/context/theme-context";
import { Noto_Sans_Thai } from "next/font/google";
import {
  MapPin,
  Phone,
  Printer,
  Clock,
  Globe,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500", "700"],
});

const Footer = () => {
  const { lang, themeColor1 } = useThemeContext();

  const [stats, setStats] = useState({ clicks: 0, impressions: 0 });
  const [loading, setLoading] = useState(true);

  const displayColor =
    themeColor1 === "#D9D9D9" ? "#323296" : themeColor1 || "#323296";
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchGoogleStats = async () => {
      try {
        // --- ใช้ค่าจาก .env ผ่าน process.env.NEXT_PUBLIC_API_URL ---
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const response = await fetch(`${apiUrl}/api/google-stats/clicks`);

        const data = await response.json();

        if (data && data.clicks) {
          setStats({
            clicks: data.clicks.clicks || 0,
            impressions: data.clicks.impressions || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching google stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleStats();
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
    statsLabel:
      lang === "th"
        ? "การเข้าถึงผ่าน Google / ต่อเดือน  "
        : "Monthly Google Visibility",

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
      className={`${notoSansThai.className} bg-white border-t border-gray-100 pt-20 pb-10`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <h3
              className="text-3xl font-black tracking-tighter"
              style={{ color: displayColor }}
            >
              {texts.company}
            </h3>

            <div className="space-y-5 text-gray-600">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-gray-50">
                  <MapPin
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: displayColor }}
                  />
                </div>
                <p className="text-sm leading-relaxed pt-1">{texts.address}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ml-0 sm:ml-11">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <Phone
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ color: displayColor }}
                  />
                  <span className="text-sm font-medium hover:underline">
                    {texts.tel}
                  </span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <Printer
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ color: displayColor }}
                  />
                  <span className="text-sm font-medium hover:underline">
                    {texts.fax}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50 w-fit">
                <Clock className="w-4 h-4 text-gray-300" />
                <span className="text-xs tracking-wide text-gray-400 font-medium italic">
                  {texts.hours}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 lg:col-span-2 gap-4">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                {texts.quickLinks}
              </h4>
              <ul className="space-y-4">
                {texts.menu1.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${lang}/${item.path}`}
                      className="group flex items-center text-gray-500 hover:text-black transition-colors"
                    >
                      <div
                        className="w-0 h-[1.5px] bg-current group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100"
                        style={{ backgroundColor: displayColor }}
                      ></div>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 pt-10">
              <ul className="space-y-4">
                {texts.menu2.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${lang}/${item.path}`}
                      className="group flex items-center text-gray-500 hover:text-black transition-colors"
                    >
                      <div
                        className="w-0 h-[1.5px] bg-current group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100"
                        style={{ backgroundColor: displayColor }}
                      ></div>
                      <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[11px] text-gray-400 tracking-wider font-medium order-2 md:order-1">
            {texts.copyright}
          </p>

          <div className="group relative order-1 md:order-2">
            <div
              className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"
              style={{ backgroundColor: themeColor1 || "#0286C2" }}
            />

            <div
              className="relative flex items-center gap-6 px-6 py-4 bg-white rounded-2xl border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
              style={{
                borderColor: `${themeColor1}20`,
              }}
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 transition-colors duration-500 group-hover:bg-opacity-10"
                style={{
                  backgroundColor: undefined,
                }}
              >
                <style jsx>{`
                  .group:hover .stats-icon {
                    color: ${themeColor1 || "#0286C2"};
                  }
                `}</style>
                <BarChart3 className="w-6 h-6 text-gray-400 stats-icon transition-colors" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                    {texts.statsLabel}
                  </span>
                  <TrendingUp className="w-3 h-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black tracking-tight text-gray-900 leading-none">
                    {loading ? "..." : stats.impressions.toLocaleString()}
                  </span>

                  <div
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border"
                    style={{
                      backgroundColor: `${themeColor1}10`,
                      color: themeColor1 || "#0286C2",
                      borderColor: `${themeColor1}30`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: themeColor1 || "#0286C2" }}
                    />
                    VERIFIED
                  </div>
                </div>
              </div>

              <div className="ml-2 pl-6 border-l border-gray-100 hidden sm:block">
                <Globe
                  className="w-5 h-5 text-gray-200 group-hover:rotate-[15deg] transition-all duration-700"
                  style={{ color: undefined }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
