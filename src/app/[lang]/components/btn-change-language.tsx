import { useContext } from "react"
import { ThemeContext } from "../../context/theme-context"

export default function BtnChangeLanguage() {
  const { lang, changeLanguage } = useContext(ThemeContext);
  return (
    <button onClick={() => changeLanguage(lang === 'th' ? 'en' : 'th')}>
      {lang == "en" ? "English" : "ภาษาไทย"}
    </button>
  )
}