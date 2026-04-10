import PatternComponents from "@app/components/pattern-components";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: {
    th: "บริษัท เอเวอร์สปริง อโกรเคม จำกัด",
    en: "Everspring Agrochem Co., Ltd.",
  },
  description: {
    th: "บริษัท เอเวอร์สปริง อโกรเคม ผลิตและจำหน่ายสารป้องกันศัตรูพืชและปุ๋ยคุณภาพมาตรฐานสากล",
    en: "Everspring Agrochem produces and sells high-quality crop protection products and fertilizers meeting international standards.",
  },
  keywords: {
    th: [
      "เอเวอร์สปริง",
      "เอเวอร์สปริง อโกรเคม",
      "บริษัทเอเวอร์สปริง อโกรเคม",
      "บริษัท เอเวอร์สปริง อโกรเคม",
      "บริษัทเอเวอร์สปริงค์ อโกรเคม",
      "บริษัท เอเวอร์สปริงค์ อโกรเคม",
    ],
    en: [
      "Everspring",
      "Everspring Agrochem",
      "crop protection products",
      "fertilizers",
      "agrochemical company",
    ],
  },
});

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">
        บริษัท เอเวอร์สปริง อโกรเคม จำกัด / Everspring Agrochem Co., Ltd.
      </h1>
      <PatternComponents pageName="home" />
    </>
  );
}
