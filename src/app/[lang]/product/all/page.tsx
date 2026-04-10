/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import clsx from "clsx";
import { ChevronUp, ChevronDown, ListFilter } from "lucide-react";

import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

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
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<{ [key: string]: any[] }>({
    herbicide: [],
    insecticide: [],
    fungicide: [],
    acaricide: [],
    plant: [],
    mollus: [],
  });

  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const [h, i, f, a, p, m] = await Promise.all([
          getProductsByCategoryId(PRODUCT_CATEGORY.HERBICIDE),
          getProductsByCategoryId(PRODUCT_CATEGORY.INSECTICIDE),
          getProductsByCategoryId(PRODUCT_CATEGORY.FUNGICIDE),
          getProductsByCategoryId(PRODUCT_CATEGORY.ACARICIDE),
          getProductsByCategoryId(PRODUCT_CATEGORY.PLANT),
          getProductsByCategoryId(PRODUCT_CATEGORY.MOLLUS),
        ]);

        setProducts({
          herbicide: h,
          insecticide: i,
          fungicide: f,
          acaricide: a,
          plant: p,
          mollus: m,
        });
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const totalProducts = useMemo(() => {
    return Object.values(products).reduce((acc, curr) => acc + curr.length, 0);
  }, [products]);

  return (
    <section className="min-h-screen bg-gray-50/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-8">
          <div>
            <h2
              style={{ color: displayColor }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 transition-colors duration-300"
            >
              {lang === "th" ? "ผลิตภัณฑ์ทั้งหมด" : "All Products"}
            </h2>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-8 h-[2px] bg-blue-500"></span>
              <p className="text-sm sm:text-base font-medium uppercase tracking-wider">
                {lang === "th"
                  ? `พบสินค้าทั้งหมด ${totalProducts} รายการ`
                  : `Total ${totalProducts} products found`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="group flex items-center gap-2  border border-gray-200 px-5 py-2.5 rounded-full shadow-sm  hover:border-blue-400 transition-all duration-200 text-gray-700 font-medium"
          >
            <ListFilter className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              {lang === "th" ? "เรียงลำดับ: " : "Sort by: "}
              <span className="text-blue-600 font-bold">
                {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </span>
            </span>
            {sortOrder === "asc" ? (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin  h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className=" p-6  transition-shadow">
              <HerbicideUI
                sortOrder={sortOrder}
                activities={products.herbicide}
                isAllPage
              />
            </div>

            <div className=" p-6  transition-shadow">
              <InsecticideUI
                sortOrder={sortOrder}
                activities={products.insecticide}
                isAllPage
              />
            </div>

            <div className=" p-6  transition-shadow">
              <Fungicide
                sortOrder={sortOrder}
                activities={products.fungicide}
                isAllPage
              />
            </div>

            <div className=" p-6  transition-shadow">
              <AcaricideUI
                sortOrder={sortOrder}
                activities={products.acaricide}
                isAllPage
              />
            </div>

            <div className=" p-6  transition-shadow">
              <PlantUI
                sortOrder={sortOrder}
                activities={products.plant}
                isAllPage
              />
            </div>

            <div className=" p-6  transition-shadow">
              <MollusUI
                sortOrder={sortOrder}
                activities={products.mollus}
                isAllPage
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
