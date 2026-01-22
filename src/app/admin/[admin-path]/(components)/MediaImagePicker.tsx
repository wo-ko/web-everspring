"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
};

interface ServerFile {
  id: string;
  imagePath: string;
}

export default function MediaImagePicker({ open, onClose, onSelect }: Props) {
  const [files, setFiles] = useState<ServerFile[]>([]);

  useEffect(() => {
    if (!open) return;

    async function fetchFiles() {
      const res = await fetch(`${API_URL}/images`);
      const json = await res.json();

      const list = (Array.isArray(json) ? json : (json.data ?? [])).map(
        (item: any) => ({
          id: item.imageId || item.id,
          imagePath: item.imagePath,
        }),
      );

      setFiles(list);
    }

    fetchFiles();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-4xl p-4">
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold">เลือกรูปจากคลัง</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-4 gap-3 max-h-[60vh] overflow-auto">
          {files.map((f) => {
            const raw = f.imagePath.trim();
            const imageUrl = raw.startsWith("http")
              ? raw
              : `${API_URL}${raw.startsWith("/") ? "" : "/"}${raw}`;

            return (
              <button
                key={f.id}
                onClick={() => {
                  onSelect(imageUrl);
                  onClose();
                }}
                className="group"
              >
                <img
                  src={imageUrl}
                  className="h-32 w-full object-cover rounded border group-hover:ring-2 ring-black"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
