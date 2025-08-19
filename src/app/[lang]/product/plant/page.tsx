"use client";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";
import ProductList from "@app/[lang]/components/product-list";

export const DataPlant = [
  "ethephon 52% SL",
  "gibberellic acid 4% W/V EC",
  "paclobutrazol 10% WP",
  "paclobutrazol 15% WP",
  "paclobutrazol 25% W/V SC",
];

interface Props {
  sortOrder: "asc" | "desc";
}

export default function Plant({ sortOrder }: Props) {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Plant Growth Regulators (ควบคุมการออกดอก)"}
        activities={DataPlant}   // ส่งตรง
        sortOrder={sortOrder}     // ProductList จัดเรียงเอง
      />
    </section>
  );
}
