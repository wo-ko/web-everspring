"use client";

import { useState, useEffect } from "react";

export default function ProductFormModal({
  product,
  onClose,
  onSaved,
}: {
  product: any | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (product) {
      setNameTh(product.productName?.th ?? "");
      setNameEn(product.productName?.en ?? "");
      setCategoryId(product.productCategoryId ?? 1);
    }
  }, [product]);

  async function submit() {
    if (!nameTh.trim()) return;

    setLoading(true);

    const base = process.env.NEXT_PUBLIC_API_URL;

    const isEdit = !!product?.productId;

    const url = isEdit
      ? `${base}/products/${product.productId}`
      : `${base}/products`;

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productCategoryId: categoryId,
        productName: {
          th: nameTh,
          en: nameEn,
        },
      }),
    });

    setLoading(false);
    onSaved();
    onClose();
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200
        ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`
          bg-white rounded-2xl shadow-xl
          w-full max-w-2xl mx-4
          transform transition-all duration-200
          ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {product ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-sm text-gray-500">ชื่อสินค้า (TH)</label>
            <textarea
              rows={2}
              className="
        mt-1 w-full border rounded-lg px-3 py-2
        focus:ring-2 focus:ring-black/20 outline-none
        resize-none
      "
              value={nameTh}
              onChange={(e) => setNameTh(e.target.value)}
              placeholder="เช่น fenpyroximate 5% W/V SC"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">ชื่อสินค้า (EN)</label>
            <textarea
              rows={2}
              className="
        mt-1 w-full border rounded-lg px-3 py-2
        focus:ring-2 focus:ring-black/20 outline-none
        resize-none
      "
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="fenpyroximate 5% W/V SC"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">หมวดสินค้า</label>
            <select
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/20 outline-none"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value={1}>Herbicide</option>
              <option value={2}>Insecticide</option>
              <option value={3}>Fungicide</option>
              <option value={4}>Acaricide</option>
              <option value={5}>Plant Growth Regulators</option>
              <option value={6}>Molluscicide</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            ยกเลิก
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-900 disabled:opacity-50"
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}
