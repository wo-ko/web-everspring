"use client";
import ProductList from "@app/[lang]/components/product-list";
import { DataMollus } from "@app/[lang]/data/mollus";

type Props = {
  sortOrder: "asc" | "desc";
  activities?: string[];
  isAllPage?: boolean;
};

export default function MollusUI({ sortOrder, isAllPage }: Props) {
  return (
    <div
      className={`
        w-full
        mx-auto
        ${
          isAllPage
            ? "px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12"
            : "flex flex-col  px-8 sm:px-4 md:px-8 lg:px-8 py-6 sm:py-8 md:py-12"
        }
        max-w-full
        sm:max-w-xl
        md:max-w-3xl
        lg:max-w-5xl
      `}
    >
      <div className="w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
        <ProductList
          titles={"Molluscicide (หอย)"}
          activities={DataMollus} // ส่งตรงไป ProductList
          sortOrder={sortOrder} // ProductList จัดเรียงเอง
        />
      </div>
    </div>
  );
}
