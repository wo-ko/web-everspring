// "use client";

import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: "บริษัท เอเวอร์สปริง อโกรเคม จำกัด | สารป้องกันศัตรูพืช / Everspring Agrochem Co., Ltd. | Crop Protection & Fertilizers",
  description: "บริษัท เอเวอร์สปริง อโกรเคม ผลิตและจำหน่ายสารป้องกันศัตรูพืชและปุ๋ยคุณภาพมาตรฐานสากล / Everspring Agrochem produces and sells high-quality crop protection products and fertilizers meeting international standards.",
  keywords: "สารป้องกันศัตรูพืช, ปุ๋ย, ธาตุอาหารพืช, Everspring, crop protection, fertilizers"
});

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">บริษัท เอเวอร์สปริง อโกรเคม จำกัด / Everspring Agrochem Co., Ltd.</h1>
      <PatternComponents pageName="home" />
    </>
  );
}

