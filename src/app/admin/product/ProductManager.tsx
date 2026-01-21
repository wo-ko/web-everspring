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

export default function ProductManager() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [tab, setTab] = useState<"active" | "deleted">("active");

  /* =========================
   * Fetch
   * ========================= */
  async function fetchProducts() {
    const base = process.env.NEXT_PUBLIC_API_URL;
    const url =
      tab === "active"
        ? `${base}/products/grouped-by-category`
        : `${base}/products/grouped-by-category?deleted=true`;

    const res = await fetch(url);
    const data = await res.json();
    setAllProducts(data);
  }

  useEffect(() => {
    setCategoryId("all");
    setSearch("");
    fetchProducts();
  }, [tab]);

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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">จัดการสินค้า</h1>

        {tab === "active" && (
          <button
            onClick={() => setEditing({})}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            + เพิ่มสินค้า
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("active")}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            tab === "active"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          ใช้งานอยู่
        </button>

        <button
          onClick={() => setTab("deleted")}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            tab === "deleted"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          ถูกลบแล้ว
        </button>

        <span className="ml-auto text-sm text-gray-500">
          พบสินค้า {products.length} รายการ
        </span>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              e.target.value === "all" ? "all" : Number(e.target.value),
            )
          }
          className="w-full rounded border px-3 py-2 text-sm md:w-64"
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
          className="w-full rounded border px-3 py-2 text-sm md:w-80 focus:ring-2 focus:ring-black/20 outline-none"
        />
      </div>

      <ProductTable
        products={products}
        mode={tab}
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
