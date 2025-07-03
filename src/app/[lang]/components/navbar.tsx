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

import { useState, useContext } from "react";
import { ThemeContext } from "@app/context/theme-context";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const Logo = () => (
  <div className="flex items-center">
    <img
          src="https://res.cloudinary.com/dyg6r8pec/image/upload/w_130,h_100,c_fit/v1749023798/logo_everspring-01-Photoroom_lq2qb3.png"
          alt="Logo"
        />
  </div>
);

export default function Navbar() {
  const { lang, themeColor1 } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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

  const textColor =
    themeColor1?.toLowerCase() === "#d9d9d9" || themeColor1?.toLowerCase() === "white"
      ? "text-black"
      : "text-white";

  const handleMobileSubmenuToggle = (itemName: string) => {
    setOpenSubmenu((prev) => (prev === itemName ? null : itemName));
  };

  const openMobileMenu = () => {
    setOpenSubmenu(null);
    setIsMobileMenuOpen(true);
  };

  return (
    <>
      {!isMobileMenuOpen && (
        <header
          className="w-full shadow-md transition-colors duration-300 sticky top-0 z-50"
          style={{ backgroundColor: themeColor1 || "#323296" }}
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
            <Link href={`/${lang}`} className={textColor}>
              <Logo />
            </Link>
            <nav
              className={`hidden lg:flex items-center gap-10 font-medium text-[16px] tracking-wide relative ${textColor}`}
            >
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={`/${lang}/${item.path}`}
                    className="transition-all duration-200 flex items-center gap-1 hover:opacity-80"
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
                          className="block px-6 py-3 text-gray-700 whitespace-nowrap text-[15px] transition-all duration-200 rounded-md hover:text-white hover:font-bold"
                          style={{ ["--theme-color1" as any]: themeColor1 || "#323296" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${themeColor1 || "#3A3A9A"}`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
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

            <div className="flex items-center gap-4">
              <button className={`${textColor} hover:opacity-75`}>
                <Search className="w-6 h-6" />
              </button>
              <div className="lg:hidden">
                <button onClick={openMobileMenu} className={textColor} aria-label="Open menu">
                  <Menu className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col lg:hidden"
          style={{ backgroundColor: themeColor1 || "#323296" }}
        >
          <div
            className={`flex items-center justify-between p-4 border-b ${
              textColor === "text-white" ? "border-white/20" : "border-black/10"
            }`}
          >
            <Link href={`/${lang}`} className={textColor}>
              <Logo />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-1 rounded-md ${
                textColor === "text-white" ? "hover:bg-white/20" : "hover:bg-black/10"
              } ${textColor}`}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <nav className="flex-grow p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.submenu ? (
                    <div
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-md cursor-pointer ${textColor} hover:opacity-80`}
                      onClick={() => handleMobileSubmenuToggle(item.name)}
                    >
                      <span className="text-lg font-medium">{item.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <Link
                      href={`/${lang}/${item.path}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center w-full px-4 py-3 rounded-md text-lg font-medium ${textColor} hover:opacity-80`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.submenu && (
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        openSubmenu === item.name ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <ul className="pl-6 pt-2 pb-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={`/${lang}/${subItem.path}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block px-4 py-2 rounded-md ${textColor} hover:opacity-80`}
                            >
                              - {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

