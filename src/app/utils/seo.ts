// interface MetadataProps {
//   title: string;
//   description: string;
//   keywords?: string;
// }

// export function generateMetadata({ title, description, keywords }: MetadataProps) {
//   return {
//     title,
//     description,
//     keywords
//   };
// }

interface LangText {
  th: string;
  en: string;
}

interface MetadataProps {
  title: LangText;
  description: LangText;
  keywords?: {
    th: string[];
    en: string[];
  };
}

export function generateMetadata({
  title,
  description,
  keywords,
}: MetadataProps) {
  const lang = "th"; // หรือดึงจาก context / cookie

  return {
    title: title[lang],
    description: description[lang],
    keywords: keywords?.[lang]?.join(", "),
  };
}
