// "use client";

import { generateMetadata } from "@app/utils/seo";
import AllProduct from "./all/page";

export const metadata = generateMetadata({
  title: "บริษัท เอเวอร์สปริง อโกรเคม จำกัด | สารป้องกันศัตรูพืช / Everspring Agrochem Co., Ltd.",
  description: "รายชื่อสินค้าและสารป้องกันศัตรูพืช รวมถึงปุ๋ยและธาตุอาหารพืชที่บริษัทผลิตและจำหน่าย / Our products including crop protection, fertilizers and plant nutrients.",
  keywords: "เอเวอร์สปริง ,เอเวอร์สปริง อโกรเคม, บริษัทเอเวอร์สปริงค์ อโกรเคม, บริษัท เอเวอร์สปริงค์ อโกรเคม"
});

export default function Product() {
  return (
    
    // <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
    // </section>
    <>
    <h1 className="sr-only">สินค้าของบริษัท เอเวอร์สปริง อโกรเคม / Our Products</h1>
      <AllProduct />
    </>
  );
}
