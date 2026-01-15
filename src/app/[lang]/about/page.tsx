// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: "บริษัท เอเวอร์สปริง อโกรเคม จำกัด / Everspring Agrochem Co., Ltd.",
  description: "เรียนรู้เกี่ยวกับบริษัท เอเวอร์สปริง อโกรเคม ทีมงาน และประวัติความเป็นมา / Learn about Everspring Agrochem, our team and company history.",
  keywords: "เกี่ยวกับ, About Us, เอเวอร์สปริง, ทีมงาน, ประวัติบริษัท, company, team"
});

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">เกี่ยวกับบริษัท เอเวอร์สปริง อโกรเคม / About Everspring Agrochem</h1>
      <PatternComponents pageName="about" />
    </>
  );
}
