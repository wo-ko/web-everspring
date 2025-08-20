"use client";

import { useContext } from "react";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import ProductList from "@app/[lang]/components/product-list";
import { herbicideProducts } from "@app/[lang]/data/herbicide";

type Props = {
  sortOrder: "asc" | "desc";
};

export default function Herbicide({ sortOrder }: Props) {
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
