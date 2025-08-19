"use client";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";
import ProductList from "@app/[lang]/components/product-list";

export const DataAcaricide = [
  "amitraz 20% W/V EC",
  "fenpyroximate 5% W/V SC",
  "fenpyroximate 5% W/V SC",
  "hexythiazox 1.8% W/V EC",
  "pyridaben 13.5% W/V EC",
  "pyridaben 20% WP",
  "spirodiclofen 24% W/V SC",
];

interface Props {
  sortOrder: "asc" | "desc";
}

export default function Acaricide({ sortOrder }: Props) {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Acaricide (ไร)"}
        activities={DataAcaricide}
        sortOrder={sortOrder} // ส่งลงไปให้ ProductList ทำการ sort
      />
    </section>
  );
}
