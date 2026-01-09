
"use client";

import React, { useMemo, useContext } from "react";
import { ThemeContext } from "@app/context/theme-context";

type ProductItem =
  | string
  | {
      productId?: number;
      productName?: {
        th?: string;
        en?: string;
      };
    };

type Props = {
  titles?: string;
  activities: ProductItem[];
  sortOrder?: "asc" | "desc";
};

/**
 * helper function สำหรับดึงชื่อสินค้าแบบปลอดภัย
 */

function getProductName(
  productName: { th?: string; en?: string } | undefined,
  lang: "th" | "en"
): string {
  return productName?.[lang] ?? "";
}

export default function ProductList({
  titles,
  activities,
  sortOrder = "asc",
}: Props) {
  // บังคับ type lang ให้ชัด เพื่อไม่ให้ TS error
  const { lang } = useContext(ThemeContext) as { lang: "th" | "en" };

  const sortedActivities = useMemo(() => {
    if (!Array.isArray(activities)) return [];

    return [...activities].sort((a, b) => {
      const nameA =
        typeof a === "string" ? a : getProductName(a.productName, lang);

      const nameB =
        typeof b === "string" ? b : getProductName(b.productName, lang);

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }, [activities, sortOrder, lang]);

  if (!activities || activities.length === 0) return null;

  return (
    <div>
      {titles && <h3 className="font-bold text-xl mb-4">{titles}</h3>}

      <ul className="space-y-1 text-gray-700 text-sm">
        {sortedActivities.map((product, index) => {
          const displayName =
            typeof product === "string"
              ? product
              : getProductName(product.productName, lang);

          return <li key={index}>{displayName}</li>;
        })}
      </ul>
    </div>
  );
}
