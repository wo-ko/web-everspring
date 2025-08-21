"use client";
import ProductList from "@app/[lang]/components/product-list";
import { acaricide } from "@app/[lang]/data/acaricide";

type DataProps = {
  sortOrder: "asc" | "desc";
  activities: any[];
  isAllPage?: boolean;
};

export default function AcaricideUI({ sortOrder, activities, isAllPage }: DataProps) {
  return (
    <div className={isAllPage ? "px-4 sm:px-6 lg:px-8 md:py-16" : "w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 md:py-16"}>
      <ProductList titles="Acaricide (ไร)" activities={activities} sortOrder={sortOrder} />
    </div>
  );
}
