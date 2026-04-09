// "use client";

import { generateMetadata } from "@app/utils/seo";
import AllProduct from "./all/page";

export const metadata = generateMetadata({
  title: {
    th: "สินค้าของบริษัท เอเวอร์สปริง อโกรเคม",
    en: "Everspring Agrochem Products",
  },
  description: {
    th: "รายชื่อสินค้าและสารป้องกันศัตรูพืช รวมถึงปุ๋ยและธาตุอาหารพืชที่บริษัทผลิตและจำหน่าย",
    en: "Our products include crop protection solutions, fertilizers, and plant nutrients.",
  },
  keywords: {
    th: [
      "เอเวอร์สปริง",
      "เอเวอร์สปริง อโกรเคม",
      "สารป้องกันศัตรูพืช",
      "ปุ๋ย",
      "ธาตุอาหารพืช",
      "สินค้าเกษตร",
      "บริษัท เอเวอร์สปริง อโกรเคม",
      "บริษัทเอเวอร์สปริงค์ อโกรเคม",
    ],
    en: [
      "Everspring",
      "Everspring Agrochem",
      "crop protection",
      "fertilizers",
      "plant nutrients",
      "agriculture products",
      "agrochemical company",
    ],
  },
});

export default function Product() {
  return (
    <>
      <h1 className="sr-only">
        สินค้าของบริษัท เอเวอร์สปริง อโกรเคม / Our Products
      </h1>
      <AllProduct />
    </>
  );
}
