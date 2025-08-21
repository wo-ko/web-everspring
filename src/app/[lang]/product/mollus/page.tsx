'use client';
import ProductList from "@app/[lang]/components/product-list";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";

export const DataMollus = ["metaldehyde 5% GB"];

interface Props {
  sortOrder: 'asc' | 'desc';
}

export default function Mollus({ sortOrder }: Props) {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Molluscicide (หอย)"}
        activities={DataMollus} // ส่งตรงไป ProductList
        sortOrder={sortOrder}   // ProductList จัดเรียงเอง
      />
    </section>
  );
}
