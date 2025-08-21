"use client";

import ProductList from "@app/[lang]/components/product-list";
import { herbicideProducts } from "@app/[lang]/data/herbicide";

type Props = {
  sortOrder: "asc" | "desc";
  activities: string[];
};

export default function HerbicideUI({ sortOrder }: Props) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Herbicide (วัชพืช)"}
        activities={herbicideProducts}
        sortOrder={sortOrder} // จัดเรียงใน ProductList
      />
    </section>
  );
}
