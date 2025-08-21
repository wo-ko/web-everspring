"use client";

import React, { useContext } from "react";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import ProductList from "@app/[lang]/components/product-list";

export const insecticideProducts = [
  "abamectin 1.8% EC",
  "acetamiprid 2.85% W/V EC",
  "acetamiprid 20% SP",
  "acetamiprid 20% W/V SL",
  "acetamiprid+abamectin 3%+1% W/V EC",
  "buprofezin 25% WP",
  "cartap hydrochloride 50% SP",
  "chlorfenapyr 10% SC",
  "cypermethrin + profenofos 4% + 40% W/V Ec", 
  "cypermethrin 35% EC",
  "diflubenzuron 25% WP",
  "dinotefuran 20% SG",
  "emamectin benzoate 1.92% W/V EC",
  "emamectin benzoate 5% WG", 
  "fipronil 5% W/V SC",
  "fipronil 80% WG",
  "imidacloprid 35% SC",
  "imidacloprid 5% W/V EC",
  "imidacloprid 60% FS",
  "imidacloprid 70% WG",
  "indoxacarb + emamectin benzoate 9%+1% W/V SC",
  "indoxacarb 15% SC",
  "lambda-cyhalotrin 2.5% EC",
  "lufenuron + emamectinbenzoate 2% +1% W/V SC",
  "lufenuron 5% W/V EC",
  "methoxyfenozide 24% W/V SC",
  "pirimiphos-methyl 50% EC",
  "pymetrozine 50% WG",
  "spinosad 12% W/V SC",
  "thiamethoxam + lambda-cyhalothrin 14.1% + 10.6% W/V ZC",
  "thiamethoxam 25% WG",
  "thiodicarb 75% WP",
  "triacloprid 24% W/V SC",
  "triazophos 40% W/V EC"
];

interface Props {
  sortOrder: "asc" | "desc";
}

export default function Insecticide({ sortOrder }: Props) {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <ProductList
        titles={"Insecticide (แมลงศัตรูพืช)"}
        activities={insecticideProducts} // ส่งตรงไป ProductList
        sortOrder={sortOrder} // ProductList จัดเรียงเอง
      />
    </section>
  );
}
