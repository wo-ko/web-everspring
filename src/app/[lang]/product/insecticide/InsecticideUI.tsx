"use client";

import ProductList from "@app/[lang]/components/product-list";
import { insecticideProducts } from "@app/[lang]/data/insecticide";

type Props = {
  sortOrder: "asc" | "desc";
  activities: string[];
};

export default function InsecticideUI({ sortOrder }: Props) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 md:py-16">
      <ProductList
        titles={"Insecticide (แมลงศัตรูพืช)"}
        activities={insecticideProducts} // ส่งตรงไป ProductList
        sortOrder={sortOrder} // ProductList จัดเรียงเอง
      />
    </section>
  );
}
