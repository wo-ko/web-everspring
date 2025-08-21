"use client";
import React, { useContext, useState, useMemo } from "react";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import clsx from "clsx";

import { herbicideProducts } from "@app/[lang]/data/herbicide";
import { insecticideProducts } from "@app/[lang]/data/insecticide";
import { diseaseControlProducts } from "@app/[lang]/data/fungicide";
import { acaricide } from "@app/[lang]/data/acaricide";
import { DataPlant } from "@app/[lang]/data/plant";
import { DataMollus } from "@app/[lang]/data/mollus";
import AcaricideUI from "../acaricide/AcaricideUI";
import Fungicide from "../fungicide/Fungicide";
import HerbicideUI from "../herbicide/HerbicideUI";
import InsecticideUI from "../insecticide/InsecticideUI";
import MollusUI from "../mollus/MollusUI";
import PlantUI from "../plant/PlantUI";

export default function AllProduct() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // รวมทุกหมวดเพื่อแสดงจำนวนรวม
  const totalProducts = useMemo(() => {
    return (
      herbicideProducts.length +
      insecticideProducts.length +
      diseaseControlProducts.length +
      acaricide.length +
      DataPlant.length +
      DataMollus.length
    );
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* ปุ่มเรียงลำดับ */}
      <div className="flex justify-between items-center gap-4 mb-8 w-full max-w-3xl mx-auto">
        <span className="text-gray-700 font-light">
          {lang === "th"
            ? `| แสดงผลิตภัณฑ์ทั้งหมด (${totalProducts} รายการ)`
            : `| Showing all products (${totalProducts} items)`}
        </span>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 text-white font-light rounded transition-colors duration-200"
          style={{ backgroundColor: "#0286C2" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#026699")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#0286C2")
          }
        >
          {lang === "th" ? `เรียงตาม ` : `Sort by `}
          {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>

      <h2
        style={{ color: themeColor1 || "#323296" }}
        className={clsx(
          "text-center font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl mb-4"
        )}
      >
        {lang === "th" ? "ผลิตภัณฑ์ทั้งหมด" : "All Products"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <HerbicideUI sortOrder={sortOrder} activities={herbicideProducts} />

        <InsecticideUI sortOrder={sortOrder} activities={insecticideProducts} />
        <Fungicide sortOrder={sortOrder} activities={diseaseControlProducts} />

        <AcaricideUI
          sortOrder={sortOrder}
          activities={acaricide}
          isAllPage={true}
        />

        <PlantUI sortOrder={sortOrder} activities={DataPlant} />

        <MollusUI sortOrder={sortOrder} activities={DataMollus} />
      </div>
    </section>
  );
}
