"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ServerImage {
  id: number;
  filename: string;
  url: string;
}

export default function ImageManager({
  onSelect,
}: {
  onSelect: (image: ServerImage) => void;
}) {
  const [images, setImages] = useState<ServerImage[]>([]);
  const [selected, setSelected] = useState<ServerImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch(`${API_URL}/images`);
        const json = await res.json();

        const list: ServerImage[] = Array.isArray(json)
          ? json
          : Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.images)
          ? json.images
          : [];

        setImages(list);
      } catch (err) {
        console.error("load images error", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-sm text-gray-500">
        กำลังโหลดรูป...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {images.length === 0 && (
        <div className="flex items-center justify-center h-40 text-sm text-gray-400">
          ยังไม่มีรูปในระบบ
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img) => {
          const isActive = selected?.id === img.id;

          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelected(img)}
              className={`border rounded-lg p-2 transition ${
                isActive
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "hover:border-gray-400"
              }`}
            >
              <img
                src={`${API_URL}${img.url}`}
                alt={img.filename}
                className="h-32 w-full object-contain bg-gray-50 rounded"
              />
              <div className="mt-1 text-xs text-gray-500 truncate">
                {img.filename}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onSelect(selected)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            <Check className="w-4 h-4" />
            เลือกรูปนี้
          </button>
        </div>
      )}
    </div>
  );
}
