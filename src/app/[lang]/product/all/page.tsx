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
    <section className="max-w-full px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-16 mx-auto">
      {/* ปุ่มเรียงลำดับ */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 w-full max-w-5xl mx-auto">
        <span className="text-gray-700 font-light text-sm sm:text-base md:text-lg">
          {lang === "th"
            ? `| แสดงผลิตภัณฑ์ทั้งหมด (${totalProducts} รายการ)`
            : `| Showing all products (${totalProducts} items)`}
        </span>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-3 py-1 sm:px-4 sm:py-2 text-white font-light rounded transition-colors duration-200 text-xs sm:text-sm md:text-base"
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

      {/* หัวข้อ */}
      <h2
        style={{ color: themeColor1 || "#323296" }}
        className={clsx(
          "text-center font-extrabold tracking-tight mb-6",
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        )}
      >
        {lang === "th" ? "ผลิตภัณฑ์ทั้งหมด" : "All Products"}
      </h2>

      {/* Grid ของสินค้า */}
      <div
        className="w-full
  mx-auto
  px-2 sm:px-4 md:px-6 lg:px-8 
  py-6 sm:py-8 md:py-12
  grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <HerbicideUI
          sortOrder={sortOrder}
          activities={herbicideProducts}
          isAllPage={true}
        />
        <InsecticideUI
          sortOrder={sortOrder}
          activities={insecticideProducts}
          isAllPage={true}
        />
        <Fungicide
          sortOrder={sortOrder}
          activities={diseaseControlProducts}
          isAllPage={true}
        />
        <AcaricideUI
          sortOrder={sortOrder}
          activities={acaricide}
          isAllPage={true}
        />
        <PlantUI
          sortOrder={sortOrder}
          activities={DataPlant}
          isAllPage={true}
        />
        <MollusUI
          sortOrder={sortOrder}
          activities={DataMollus}
          isAllPage={true}
        />
      </div>
    </section>
  );
}
