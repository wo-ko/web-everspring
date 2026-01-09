// src/app/adapters/product-adapter.ts
import { ProductActivity } from "@app/types/product";

export function toProductActivities(
  products: {
    productId: number;
    productName?: { th?: string; en?: string };
  }[],
  lang: "th" | "en" = "th" // 👈 default ที่นี่
): ProductActivity[] {
  return products.map((p) => ({
    id: p.productId,
    label: p.productName?.[lang] ?? "",
  }));
}
