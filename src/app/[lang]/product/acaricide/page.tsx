"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataAcaricide } from "@app/[lang]/data/acaricide";

export default function AcaricidePage() {
  const sortOrder: "asc" | "desc" = "asc"; // กำหนด default หรือเปลี่ยนเป็น state / query

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Acaricide (ไร)"}
        activities={DataAcaricide}
        sortOrder={sortOrder} // ProductList จะทำการ sort
      />
    </section>
  );
}
