"use client";

import { ThemeContext } from "@app/context/theme-context";
import React, { useContext, useMemo } from "react";

type Props = {
  titles?: string;
  activities: string[];
  sortOrder?: "asc" | "desc"; // รับจาก parent
  product?: "on";
};

export default function ProductList({ titles, activities, sortOrder }: Props) {
  const { lang } = useContext(ThemeContext);

  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) =>
      sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );
  }, [activities, sortOrder]);

  if (!activities || activities.length === 0) return null;

  return (
    <div>
      {/* หัวข้อหมวด พร้อมจำนวนสินค้า */}
      <h3 className="font-bold text-xl mb-4">{titles}</h3>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-8 w-full max-w-3xl mx-auto">
        <span className="text-gray-500 text-sm sm:text-base">
          {lang === "th"
            ? `| แสดงผลิตภัณฑ์ ${activities.length} รายการ`
            : `| Showing ${activities.length} items`}
        </span>
      </div>

      {/* รายการสินค้า */}
      <ul className="space-y-1 text-gray-700 text-sm">
        {sortedActivities.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
}
