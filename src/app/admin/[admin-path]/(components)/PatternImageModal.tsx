"use client";

import { ImageField } from "@app/admin/config/imagePatternConfig";
import {
  resolveImageUrl,
  useMediaImages,
} from "@app/admin/hook/useMediaImages";
import { useEffect } from "react";


type Props = {
  target: {
    layout: any;
    field: ImageField;
    index?: number;
  } | null;
  onClose: () => void;
  onSelect: (image: {
    id: number;
    imagePath: string;
    imageUrl: string;
  }) => void;
};

export default function PatternImageModal({
  target,
  onClose,
  onSelect,
}: Props) {
  const { files, fetchFiles, API_URL } = useMediaImages();

  useEffect(() => {
    if (target) fetchFiles();
  }, [target, fetchFiles]);

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-5xl p-4">
        <div className="flex justify-between items-center mb-3">
          {/* <h3 className="font-semibold">เลือกรูป ({target.field})</h3> */}
          <h3 className="font-semibold">
            เลือกรูป: {target.field.label}
            {typeof target.index === "number" ? ` #${target.index + 1}` : ""}
          </h3>

          <button onClick={onClose}>✕</button>
        </div>

        {files.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            ยังไม่มีรูปในระบบ
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3 max-h-[65vh] overflow-auto">
            {files.map((img) => {
              const imagePath = (img.imagePath || "").trim();
              const imageUrl = resolveImageUrl(imagePath);

              return (
                <button
                  key={img.id}
                  type="button"
                  className="group relative"
                  onClick={() => {
                    onSelect({
                      id: Number(img.id),
                      imagePath,
                      imageUrl,
                    });
                    onClose();
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="media"
                    className="h-32 w-full object-cover rounded border group-hover:ring-2 ring-black"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
