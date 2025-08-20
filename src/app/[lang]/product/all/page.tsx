// "use client";

// import React, { useContext, useMemo, useState } from "react";
// import { ThemeContext, useThemeContext } from "@app/context/theme-context";
// import clsx from "clsx";

// // Components + data ของแต่ละหมวด
// import Acaricide from "../acaricide/page";
// import Herbicide from "../herbicide/page";
// import Insecticide from "../insecticide/page";
// import Fungicide from "../fungicide/page";
// import Plant from "../plant/page";
// import Mollus from "../mollus/page";
// import { DataAcaricide } from "@app/[lang]/data/acaricide";
// import { diseaseControlProducts } from "@app/[lang]/data/fungicide";
// import { herbicideProducts } from "@app/[lang]/data/herbicide";
// import { insecticideProducts } from "@app/[lang]/data/insecticide";
// import { DataMollus } from "@app/[lang]/data/mollus";
// import { DataPlant } from "@app/[lang]/data/plant";

// // กำหนด type ให้ component แต่ละตัวรับ sortOrder
// type CategoryComponentType = React.FC<{ sortOrder: "asc" | "desc" }>;

// export default function AllProduct() {
//   const { lang } = useContext(ThemeContext);
//   const { themeColor1 } = useThemeContext();
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

//   // รวม component + data
//   const productCategories: {
//     Component: CategoryComponentType;
//     activities: string[];
//   }[] = [
//     { Component: Herbicide, activities: herbicideProducts },
//     { Component: Insecticide, activities: insecticideProducts },
//     { Component: Fungicide, activities: diseaseControlProducts },
//     { Component: Acaricide, activities: DataAcaricide },
//     { Component: Plant, activities: DataPlant },
//     { Component: Mollus, activities: DataMollus },
//   ];

//   // รวมทุก activities เพื่อแสดงจำนวนรวม
//   const totalProducts = useMemo(
//     () => productCategories.flatMap((c) => c.activities).length,
//     [productCategories]
//   );

//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//       {/* ข้อความแสดงจำนวน และปุ่มเรียงลำดับ */}
//       <div className="flex justify-between items-center gap-4 mb-8 w-full max-w-3xl mx-auto">
//         <span className="text-gray-700 font-light">
//           {lang === "th"
//             ? `| แสดงผลิตภัณฑ์ ${totalProducts} รายการ`
//             : `| Showing ${totalProducts} items`}
//         </span>
//         <button
//           onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//           className="px-4 py-2 text-white font-light rounded transition-colors duration-200"
//           style={{
//             backgroundColor: "#0286C2",
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.backgroundColor = "#026699")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.backgroundColor = "#0286C2")
//           }
//         >
//           {lang === "th" ? `เรียงตาม ` : `Sort by `}
//           {sortOrder === "asc" ? "A-Z" : "Z-A"}
//         </button>
//       </div>

//       {/* หัวข้อใหญ่ */}
//       <h2
//         style={{ color: themeColor1 || "#323296" }}
//         className={clsx(
//           "text-center font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl mb-4"
//         )}
//       >
//         {lang === "th" ? "ผลิตภัณฑ์ทั้งหมด" : "All Products"}
//       </h2>

//       {/* Grid ของแต่ละหมวด */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {productCategories.map((category, index) => (
//           <div key={index} className="text-left">
//             <category.Component sortOrder={sortOrder} key={sortOrder + index} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";
import React, { useContext, useState, useMemo } from "react";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import clsx from "clsx";

import AcaricidePage from "../acaricide/page";
import HerbicidePage from "../herbicide/page";
import InsecticidePage from "../insecticide/page";
import FungicidePage from "../fungicide/page";
import PlantPage from "../plant/page";
import MollusPage from "../mollus/page";

export default function AllProduct() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // รวมทุกหมวดเพื่อแสดงจำนวนรวม (optional)
  const totalProducts = useMemo(() => {
    // สามารถปรับรวมจากทุก data array ของแต่ละหมวดได้
    return 0; // ถ้าไม่ต้องการนับก็ใส่ 0
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* ปุ่มเรียงลำดับ */}
      <div className="flex justify-between items-center gap-4 mb-8 w-full max-w-3xl mx-auto">
        <span className="text-gray-700 font-light">
          {lang === "th" ? `| แสดงผลิตภัณฑ์ทั้งหมด` : `| Showing all products`}
        </span>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 text-white font-light rounded transition-colors duration-200"
          style={{ backgroundColor: "#0286C2" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#026699")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0286C2")}
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
        <HerbicidePage sortOrder={sortOrder} />
        <InsecticidePage sortOrder={sortOrder} />
        <FungicidePage sortOrder={sortOrder} />
        <AcaricidePage sortOrder={sortOrder} />
        <PlantPage sortOrder={sortOrder} />
        <MollusPage sortOrder={sortOrder} />
      </div>
    </section>
  );
}
