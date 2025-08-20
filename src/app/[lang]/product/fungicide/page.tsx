"use client";
import ProductList from "@app/[lang]/components/product-list";
import { diseaseControlProducts } from "@app/[lang]/data/fungicide";

export default function Fungicide() {

  const sortOrder: "asc" | "desc" = "asc";

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Fungicide (โรคพืช)"}
        activities={diseaseControlProducts}
        sortOrder={sortOrder} // ให้ ProductList ทำการ sort
      />
    </section>
  );
}
