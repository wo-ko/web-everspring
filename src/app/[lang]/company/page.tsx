// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: "กลุ่มบริษัทในเครือเอเวอร์สปริง | Everspring Group Companies",
  description: "รวมบริษัทในเครือเอเวอร์สปริง พร้อมรายละเอียดธุรกิจและความเชี่ยวชาญของแต่ละบริษัท / Everspring group companies with business overview and expertise of each company.",
  keywords: "บริษัทในเครือ, Everspring, Group, subsidiary, ธุรกิจ, company"
});

export default function CompanyPage() {
  return (
    <div>
      <h1 className="sr-only">กลุ่มบริษัทในเครือเอเวอร์สปริง / Everspring Group Companies</h1>
      <PatternComponents pageName="company" />
    </div>
  );
}
