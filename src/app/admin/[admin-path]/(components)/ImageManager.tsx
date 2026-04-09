"use client";

import { useEffect, useState } from "react";
import { Check, ImageIcon, Loader2 } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center h-60 text-gray-400 gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-sm font-medium">กำลังโหลดรูปภาพ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center h-60 border-2 border-dashed rounded-xl bg-gray-50 text-gray-400">
          <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
          <p className="text-sm">ยังไม่มีรูปในระบบ</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => {
          const isActive = selected?.id === img.id;

          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelected(img)}
              className={`group relative flex flex-col p-2 rounded-xl border-2 transition-all duration-200 text-left ${
                isActive
                  ? "border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500/20"
                  : "border-gray-100 hover:border-gray-300 hover:shadow-sm bg-white"
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 mb-2">
                <img
                  src={`${API_URL}${img.url}`}
                  alt={img.filename}
                  className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />

                {isActive && (
                  <div className="absolute top-1 right-1 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div
                className={`px-1 text-[11px] font-medium truncate w-full ${
                  isActive ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {img.filename}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="sticky bottom-0 left-0 right-0 py-4 bg-white/80 backdrop-blur-md border-t flex justify-between items-center transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="text-sm text-gray-600">
            เลือกแล้ว:{" "}
            <span className="font-semibold text-gray-900">
              {selected.filename}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelect(selected)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 text-white" />
            ตกลงเลือกรูปนี้
          </button>
        </div>
      )}
    </div>
  );
}
