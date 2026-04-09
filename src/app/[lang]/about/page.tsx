// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: {
    th: "เกี่ยวกับบริษัท เอเวอร์สปริง อโกรเคม",
    en: "About Everspring Agrochem",
  },
  description: {
    th: "เรียนรู้เกี่ยวกับบริษัท เอเวอร์สปริง อโกรเคม ทีมงาน และประวัติความเป็นมา",
    en: "Learn about Everspring Agrochem, our team, and company history.",
  },
  keywords: {
    th: [
      "เกี่ยวกับ",
      "เอเวอร์สปริง",
      "ทีมงาน",
      "ประวัติบริษัท",
      "บริษัท เอเวอร์สปริง อโกรเคม",
    ],
    en: [
      "About Us",
      "Everspring",
      "company",
      "team",
      "company history",
      "Everspring Agrochem",
    ],
  },
});

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">
        เกี่ยวกับบริษัท เอเวอร์สปริง อโกรเคม / About Everspring Agrochem
      </h1>
      <PatternComponents pageName="about" />
    </>
  );
}
