"use client";

import { useContext } from "react";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import ProductList from "@app/[lang]/components/product-list";
import { herbicideProducts } from "@app/[lang]/data/herbicide";

export default function Herbicide() {

  const sortOrder: "asc" | "desc" = "asc";

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
