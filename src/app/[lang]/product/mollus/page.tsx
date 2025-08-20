'use client';
import ProductList from "@app/[lang]/components/product-list";
import { DataMollus } from "@app/[lang]/data/mollus";

export default function Mollus() {
  const sortOrder: "asc" | "desc" = "asc";
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Molluscicide (หอย)"}
        activities={DataMollus} // ส่งตรงไป ProductList
        sortOrder={sortOrder}   // ProductList จัดเรียงเอง
      />
    </section>
  );
}
