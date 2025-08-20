"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataMollus } from "@app/[lang]/data/mollus";

type Props = {
  sortOrder: "asc" | "desc";
  activities: string[];
};

export default function Mollus({ sortOrder }: Props) {
  return (
    <div className="flex justify-start px-4 sm:px-6 lg:px-8 md:py-16">
      <ProductList
        titles={"Molluscicide (หอย)"}
        activities={DataMollus} // ส่งตรงไป ProductList
        sortOrder={sortOrder} // ProductList จัดเรียงเอง
      />
    </div>
  );
}
