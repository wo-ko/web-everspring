"use client";

import ProductList from "@app/[lang]/components/product-list";
import { insecticideProducts } from "@app/[lang]/data/insecticide";

export default function Insecticide() {
  const sortOrder: "asc" | "desc" = "asc";

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Insecticide (แมลงศัตรูพืช)"}
        activities={insecticideProducts} // ส่งตรงไป ProductList
        sortOrder={sortOrder} // ProductList จัดเรียงเอง
      />
    </section>
  );
}
