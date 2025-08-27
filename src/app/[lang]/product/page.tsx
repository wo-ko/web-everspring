// "use client";

import { generateMetadata } from "@app/utils/seo";
import AllProduct from "./all/page";

export const metadata = generateMetadata({
  title: "สินค้าของเรา | Products / เอเวอร์สปริง อโกรเคม",
  description: "รายชื่อสินค้าและสารป้องกันศัตรูพืช รวมถึงปุ๋ยและธาตุอาหารพืชที่บริษัทผลิตและจำหน่าย / Our products including crop protection, fertilizers and plant nutrients.",
  keywords: "สารป้องกันศัตรูพืช, ปุ๋ย, ธาตุอาหารพืช, Everspring, Products, crop protection, fertilizers"
});

export default function Product() {
  return (
    
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="sr-only">สินค้าของบริษัท เอเวอร์สปริง อโกรเคม / Our Products</h1>
      <AllProduct />
    </section>
  );
}
