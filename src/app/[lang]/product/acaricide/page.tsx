"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataAcaricide } from "@app/[lang]/data/acaricide";

type Props = {
  sortOrder: "asc" | "desc";
  activities: any[];
  isAllPage?: boolean;
};

export default function AcaricidePage({
  sortOrder,
  isAllPage,
}: Props) {
  return (
    <div
      className={
        isAllPage
          ? "px-4 sm:px-6 lg:px-8 md:py-16" // layout สำหรับ AllProduct
          : "w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 md:py-16" // layout สำหรับหน้าเฉพาะหมวด
      }
    >
      <ProductList
        titles={"Acaricide (ไร)"}
        activities={DataAcaricide}
        sortOrder={sortOrder}
      />
    </div>
  );
}
