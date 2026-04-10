// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: {
    th: "ติดต่อเรา",
    en: "Contact",
  },
  description: {
    th: "ข้อมูลการติดต่อบริษัท เอเวอร์สปริง อโกรเคม โทรศัพท์ อีเมล และที่อยู่สำนักงาน",
    en: "Contact information including phone, email, and office address.",
  },
  keywords: {
    th: ["ติดต่อ", "เอเวอร์สปริง", "โทรศัพท์", "อีเมล", "ที่อยู่บริษัท"],
    en: ["Contact", "Everspring", "phone", "email", "office address"],
  },
});

export default function LangPage() {
  return (
    <>
      <h1 className="sr-only">
        ติดต่อบริษัท เอเวอร์สปริง อโกรเคม / Contact Everspring Agrochem
      </h1>
      <PatternComponents pageName="contact" />
    </>
  );
}
