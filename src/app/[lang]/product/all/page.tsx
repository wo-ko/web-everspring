'use client';

import React, { useContext } from "react";
import { ThemeContext, useThemeContext } from '@app/context/theme-context';

import clsx from "clsx";
import Acaricide from "../acaricide/page";
import Herbicide from "../herbicide/page";
import Insecticide from "../insecticide/page";
import Fungicide from "../fungicide/page";
import Plant from "../plant/page";
import Mollus from "../mollus/page";

export default function AllProduct() {
  // Accessing context values from the mocked context
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext(); // themeColor1 สามารถนำไปใช้กำหนดสี dynamic ได้ เช่น `<h2 style={{ color: themeColor1 }}>`

  // Define an array of product categories for easier mapping
  const productCategories = [
    { Component: Herbicide },
    { Component: Insecticide },
    { Component: Fungicide },
    { Component: Acaricide },
    { Component: Plant },
    { Component: Mollus },
  ];

  return (
    <div
    // className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
    >
      <h2 style={{ color: themeColor1 }} className={clsx("text-4xl font-extrabold text-gray-900 text-center mb-8 md:mb-12 tracking-tight")}>
        {lang === 'th' ? 'ประเภทสินค้าทั้งหมด' : 'All Product Categories'}
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-6 "
      >
        {productCategories.map((category, index) => (
          <div
            key={index}
          // className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 transform hover:-translate-y-1"
          >
            <div className="p-6 sm:p-8">
              {/* <h3
                className="text-2xl font-bold text-gray-800 mb-3"
              >
                {category.title}
              </h3> */}
              <p className="text-gray-600 mb-4">
                <category.Component />
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
