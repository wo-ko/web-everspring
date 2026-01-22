"use client";

import { useAdminLang } from "./AdminLangContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useAdminLang();

  return (
    <div className="ml-auto flex gap-2">
      <h1>เลือกภาษาที่จะอัพเดทข้อมูล : </h1>
      <button
        onClick={() => setLang("th")}
        className={lang === "th" ? "font-bold" : ""}
      >
        TH
      </button>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "font-bold" : ""}
      >
        EN
      </button>
    </div>
  );
}
