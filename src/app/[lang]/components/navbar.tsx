// "use client";
// import { ThemeContext } from "@app/context/theme-context";
// import Link from "next/link";
// import { useContext } from "react";

// export default function Navbar() {
//   const { lang } = useContext(ThemeContext);
//   return (
//     <div className="flex justify-between px-16 bg-blue-500">
//       <Link href={`/${lang}`}>หน้าหลัก</Link>
//       <Link href={`/${lang}/about`}>เกี่ยวกับเอเวอร์</Link>
//       <Link href={`/${lang}/company`}>บริษัทในเครือ</Link>
//       <Link href={`/${lang}/product`}>ผลิตภัณฑ์</Link>
//       <Link href={`/${lang}/news`}>ข่าว/กิจกรรม</Link>
//       <Link href={`/${lang}/contact`}>ติดต่อเรา</Link>
//     </div>
//   );
// }

"use client";

import { ThemeContext } from "@app/context/theme-context";
import Link from "next/link";
import { useContext } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const { lang, themeColor1 } = useContext(ThemeContext);

  const menuItems = [
    { name: "หน้าหลัก", path: "" },
    { name: "เกี่ยวกับเอเวอร์", path: "about" },
    { name: "บริษัทในเครือ", path: "company" },
    {
      name: "ผลิตภัณฑ์",
      path: "product",
      submenu: [
        { name: "ทั้งหมด", path: "product/all" },
        { name: "สารกำจัดไรศัตรูพืช", path: "product/acaricide" },
        { name: "สารกำจัดแมลง", path: "product/insecticide" },
        { name: "สารป้องกันกำจัดโรคพืช", path: "product/fungicide" },
        { name: "สารกำจัดวัชพืช", path: "product/herbicide" },
        { name: "สารควบคุมการเจริญเติบโต", path: "product/plant" },
        { name: "สารควบคุมหอย", path: "product/mollus" },
      ],
    },
    {
      name: "ข่าว/กิจกรรม",
      path: "news",
      submenu: [
        { name: "ข่าวสาร", path: "news/press" },
        { name: "กิจกรรม", path: "news/events" },
        { name: "ตำแหน่งว่าง", path: "news/carrier" },
      ],
    },
    { name: "ติดต่อเรา", path: "contact" },
  ];

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-center px-8 py-4">
        <nav className="flex gap-10 text-gray-800 font-medium text-[16px] tracking-wide relative">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={`/${lang}/${item.path}`}
                className="transition-all duration-200 flex items-center gap-1 hover:text-[var(--theme-color1)]"
                style={{ ["--theme-color1" as any]: themeColor1 || "#323296" }}
              >
                {item.name}
                {item.submenu && (
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                )}
              </Link>

              {item.submenu && (
                <div className="absolute left-0 top-full mt-3 bg-white shadow-xl rounded-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 min-w-[240px] z-50 border border-gray-100">
                  {item.submenu.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      href={`/${lang}/${sub.path}`}
                      className="block px-6 py-3 text-gray-700 hover:bg-[var(--theme-color1)] hover:text-white whitespace-nowrap text-[15px]"
                      style={{
                        ["--theme-color1" as any]: themeColor1 || "#323296",
                      }}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
