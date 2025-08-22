import { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";

export default function BtnChangeLanguage() {
  const { lang, changeLanguage } = useContext(ThemeContext);

  return (
    <button
      onClick={() => changeLanguage(lang === "th" ? "en" : "th")}
      className="
        px-2 py-1
        sm:px-3 sm:py-1.5
        md:px-4 md:py-2
        border border-gray-300
        rounded-lg
        text-xs sm:text-sm md:text-base
        text-gray-700
        font-semibold
        transition-all duration-200
        hover:border-gray-500 hover:text-gray-900
        active:scale-95
        focus:outline-none focus:ring-1 focus:ring-gray-400
      "
    >
      {lang === "en" ? "EN" : "TH"}
    </button>
  );
}
