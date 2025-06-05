"use client";

import { IThemeContext, IThemeDefaultData } from "@app/types/context";
import { createContext, useContext, useState } from "react";
// import { IThemeContext } from "../types/context";

export const ThemeContext = createContext<IThemeContext>({
  lang: "",
  themeColor1: "",
  themeColor2: "",
  themeColor3: "",
  themeLayout: {
    home: [],
    about: [],
  },
  themeContent: {
    home: {},
    about: {},
  },
  changeLanguage: () => {},
  changeThemeColor1: () => {},
  changeThemeColor2: () => {},
  changeThemeColor3: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

////แบบเดิม
// export default function ThemeProvider({
//   children,
//   defaultValue,
// }: Readonly<{
//   children: React.ReactNode;
//   defaultValue?: IThemeDefaultData;
// }>) {
//   // const layout = defaultValue.

//   const [lang, setLang] = useState<string>("");
//   const [themeColor1, setThemeColor1] = useState<string>("");
//   const [themeColor2, setThemeColor2] = useState<string>("");
//   const [themeColor3, setThemeColor3] = useState<string>("");
//   const changeLanguage = (language: string) => {
//     setLang(language);
//   };

//   const changeThemeColor1 = (color: string): void => {
//     setThemeColor1(color);
//   };
//   const changeThemeColor2 = (color: string): void => {
//     setThemeColor2(color);
//   };
//   const changeThemeColor3 = (color: string): void => {
//     setThemeColor3(color);
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         lang,
//         themeColor1,
//         themeColor2,
//         themeColor3,
//         themeLayout: {
//           home: [],
//           about: [],
//         },
//         themeContent: {
//           home: {},
//           about: {},
//         },
//         changeLanguage,
//         changeThemeColor1,
//         changeThemeColor2,
//         changeThemeColor3,
//         ...defaultValue,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }

export default function ThemeProvider({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue?: IThemeDefaultData;
}) {
  const [lang, setLang] = useState<string>(defaultValue?.lang || "");
  const [themeColor1, setThemeColor1] = useState<string>(
    defaultValue?.themeColor1 || ""
  );
  const [themeColor2, setThemeColor2] = useState<string>(
    defaultValue?.themeColor2 || ""
  );
  const [themeColor3, setThemeColor3] = useState<string>(
    defaultValue?.themeColor3 || ""
  );

  const changeLanguage = (language: string) => setLang(language);
  const changeThemeColor1 = (color: string) => setThemeColor1(color);
  const changeThemeColor2 = (color: string) => setThemeColor2(color);
  const changeThemeColor3 = (color: string) => setThemeColor3(color);

  return (
    <ThemeContext.Provider
      value={{
        lang,
        themeColor1,
        themeColor2,
        themeColor3,
        themeLayout: defaultValue?.themeLayout ?? { home: [], about: [] },
        themeContent: defaultValue?.themeContent ?? { home: {}, about: {} },
        changeLanguage,
        changeThemeColor1,
        changeThemeColor2,
        changeThemeColor3,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
