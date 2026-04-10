"use client";

import { useAdminLang } from "./AdminLangContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useAdminLang();

  const activeClass = "bg-white text-blue-600 shadow-sm";
  const inactiveClass =
    "text-slate-500 hover:text-slate-700 hover:bg-slate-100";

  return (
    <div className="ml-auto flex items-center gap-3">
      <span className="text-sm font-medium text-slate-500">
        ข้อมูลที่กำลังแก้ไข:
      </span>

      <div className="flex p-1 bg-slate-200/60 rounded-lg">
        <button
          onClick={() => setLang("th")}
          className={`px-4 py-1.5 text-sm font-semibold transition-all duration-200 rounded-md ${
            lang === "th" ? activeClass : inactiveClass
          }`}
        >
          TH
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-4 py-1.5 text-sm font-semibold transition-all duration-200 rounded-md ${
            lang === "en" ? activeClass : inactiveClass
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
