"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataAcaricide } from "@app/[lang]/data/acaricide";

type Props = {
  sortOrder: "asc" | "desc";
};

export default function AcaricidePage({ sortOrder }: Props) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Acaricide (ไร)"}
        activities={DataAcaricide}
        sortOrder={sortOrder}
      />
    </section>
  );
}
