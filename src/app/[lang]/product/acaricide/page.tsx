"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataAcaricide } from "@app/[lang]/data/acaricide";

type Props = {
  sortOrder: "asc" | "desc";
  activities: string[];
};

export default function AcaricidePage({ sortOrder }: Props) {
  return (
    <div className="flex justify-start px-4 sm:px-6 lg:px-8 md:py-16">
      <ProductList
        titles={"Acaricide (ไร)"}
        activities={DataAcaricide}
        sortOrder={sortOrder}
      />
    </div>
  );
}
