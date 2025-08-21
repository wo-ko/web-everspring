"use client";
import ProductList from "@app/[lang]/components/product-list";
import { acaricide } from "@app/[lang]/data/acaricide";

type dataProps = {
  sortOrder: "asc" | "desc";
  activities: any[];
  isAllPage?: boolean;
};

export default function AcaricidePage({
  sortOrder,
  isAllPage,
  activities,
}: dataProps) {
  return (
    <div
      className={
        isAllPage
          ? "px-4 sm:px-6 lg:px-8 md:py-16" // layout สำหรับ AllProduct
          : "w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 md:py-16" // layout สำหรับหน้าเฉพาะหมวด
      }
      // className="px-4 sm:px-6 lg:px-8 md:py-16"
    >
      <ProductList
        titles={"Acaricide (ไร)"}
        activities={acaricide}
        sortOrder={sortOrder}
      />
    </div>
  );
}
