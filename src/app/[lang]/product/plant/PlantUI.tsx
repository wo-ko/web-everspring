"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataPlant } from "@app/[lang]/data/plant";

type Props = {
  sortOrder: "asc" | "desc";
  activities: string[];
};

export default function PlantUI({ sortOrder }: Props) {
  return (
    <div className="flex justify-center sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Plant Growth Regulators (ควบคุมการออกดอก)"}
        activities={DataPlant} // ส่งตรง
        sortOrder={sortOrder} // ProductList จัดเรียงเอง
      />
    </div>
  );
}
