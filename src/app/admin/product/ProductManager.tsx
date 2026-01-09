"use client";

import { useEffect, useMemo, useState } from "react";
import ProductTable from "./ProductTable";
import ProductFormModal from "./ProductFormModal";

const CATEGORY_OPTIONS = [
  { id: 1, label: "Herbicide" },
  { id: 2, label: "Insecticide" },
  { id: 3, label: "Fungicide" },
  { id: 4, label: "Acaricide" },
  { id: 5, label: "Plant Growth Regulators" },
  { id: 6, label: "Molluscicide" },
];

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products/grouped-by-category`;

export default function ProductManager() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAllProducts(data);
  }

  const products = useMemo(() => {
    return allProducts.filter((p) => {
      if (categoryId !== "all" && p.productCategoryId !== categoryId) {
        return false;
      }

      if (!search.trim()) return true;

      const keyword = search.toLowerCase();
      const th = p.productName?.th?.toLowerCase() ?? "";
      const en = p.productName?.en?.toLowerCase() ?? "";

      return th.includes(keyword) || en.includes(keyword);
    });
  }, [allProducts, categoryId, search]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">จัดการสินค้า</h1>

        <button
          onClick={() => setEditing({})}
          className="px-4 py-2 bg-black text-white rounded"
        >
          + เพิ่มสินค้า
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="border rounded px-3 py-2 w-full md:w-64"
        >
          <option value="all">ทุกหมวด</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="ค้นหาชื่อสินค้า (TH / EN)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            border rounded px-3 py-2 w-full md:w-80
            focus:ring-2 focus:ring-black/20 outline-none
          "
        />
      </div>

      <div className="text-sm text-gray-500">
        พบสินค้า {products.length} รายการ
      </div>

      <ProductTable
        products={products}
        onEdit={(p) => setEditing(p)}
        onDeleted={fetchProducts}
      />

      {editing && (
        <ProductFormModal
          product={editing.productId ? editing : null}
          onClose={() => setEditing(null)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  );
}
