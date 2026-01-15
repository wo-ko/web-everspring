// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: "ติดต่อเรา | Contact ",
  description: "ข้อมูลการติดต่อบริษัท เอเวอร์สปริง อโกรเคม โทรศัพท์ อีเมล และที่อยู่สำนักงาน / Contact information including phone, email and office address.",
  keywords: "ติดต่อ, Contact, โทรศัพท์, อีเมล, Everspring"
});

export default function LangPage() {
  return (
    <>
    <h1 className="sr-only">ติดต่อบริษัท เอเวอร์สปริง อโกรเคม / Contact Everspring Agrochem</h1>
      <PatternComponents pageName="contact" />
    </>
  );
}
