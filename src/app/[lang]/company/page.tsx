// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: {
    th: "กลุ่มบริษัทในเครือเอเวอร์สปริง",
    en: "Everspring Group Companies",
  },
  description: {
    th: "รวมบริษัทในเครือเอเวอร์สปริง พร้อมรายละเอียดธุรกิจและความเชี่ยวชาญของแต่ละบริษัท",
    en: "Explore Everspring group companies, including business overview and expertise of each company.",
  },
  keywords: {
    th: [
      "บริษัทในเครือ",
      "เอเวอร์สปริง",
      "กลุ่มบริษัท",
      "ธุรกิจ",
      "บริษัท เอเวอร์สปริง",
    ],
    en: ["Everspring", "group companies", "subsidiary", "business", "company"],
  },
});

export default function CompanyPage() {
  return (
    <div>
      <h1 className="sr-only">
        กลุ่มบริษัทในเครือเอเวอร์สปริง / Everspring Group Companies
      </h1>
      <PatternComponents pageName="company" />
    </div>
  );
}
