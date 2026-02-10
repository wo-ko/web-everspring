"use client";

import { useEffect, useState } from "react";
import { JobEditor } from "./JobEditor";
import { createEmptyJob } from "@app/utils/job";
import { JobContent } from "@/types/jobcontent";
import { resolveImageUrl, useMediaImages } from "../hook/useMediaImages";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;
const MAX_IMAGES = 20;

type Props = {
  news: any;
  defaultType: number;
  onClose: () => void;
  onSaved: () => void;
};

type EventContent = {
  images: string[];
};

function buildNewsContent(type: number, content: any) {
  if (type === 3) {
    return Array.isArray(content) ? content : [content];
  }
  if (type === 2) {
    return content ?? { images: [] };
  }
  return content;
}

export default function NewsFormModal({
  news,
  defaultType,
  onClose,
  onSaved,
}: Props) {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState<string | JobContent | EventContent>(
    defaultType === 2 ? { images: [] } : "",
  );

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectMode, setSelectMode] = useState<"cover" | "images">("images");

  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentType = news?.isEvents ?? defaultType;

  const [mediaOpen, setMediaOpen] = useState(false);
  const { files: mediaImages } = useMediaImages();

  useEffect(() => {
    if (!news) {
      setIsEnabled(true);
      return;
    }

    setTitle(news.newsTitle ?? "");
    setPreview(news.preview ?? "");
    // setIsEnabled(Boolean(news.isEnabled));
    setIsEnabled(news.isEnabled == 0);
    setCoverImage(news.imgUrl ?? null);

    if (currentType === 3) {
      const parsed =
        typeof news.newsContent === "string"
          ? JSON.parse(news.newsContent)
          : news.newsContent;

      setContent(
        Array.isArray(parsed) ? parsed[0] : (parsed ?? createEmptyJob()),
      );
      return;
    }

    if (currentType === 2) {
      const parsed =
        typeof news.newsContent === "string"
          ? JSON.parse(news.newsContent)
          : news.newsContent;

      setContent({ images: parsed?.images ?? [] });
      return;
    }

    setContent(news.newsContent ?? "");
  }, [news, currentType]);

  async function submit() {
    if (!title.trim()) return;

    setLoading(true);
    const isEdit = Boolean(news?.newsId);

    const formData = new FormData();
    formData.append("newsTitle", title);
    formData.append("preview", preview);
    formData.append(
      "newsContent",
      JSON.stringify(buildNewsContent(currentType, content)),
    );
    formData.append("isEnabled", String(isEnabled ? 0 : 1));
    formData.append("isEvents", String(currentType));

    if (coverImage && currentType !== 3) {
      formData.append("imgUrl", coverImage);
    }

    const url = isEdit ? `${API_URL}/update/${news.newsId}` : `${API_URL}/add`;

    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      body: formData,
    });

    setLoading(false);
    onSaved();
  }

  const images = (content as EventContent).images ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">
            {news?.newsId ? "แก้ไขรายการ" : "เพิ่มรายการ"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {currentType !== 3 && (
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                หน้าปกข่าว
              </label>

              {coverImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border">
                  <img
                    src={resolveImageUrl(coverImage)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-black/60 text-white
                     rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={() => setCoverImage(null)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="w-full aspect-video rounded-xl border
                   flex items-center justify-center
                   text-gray-400 hover:text-black hover:border-black"
                  onClick={() => {
                    setSelectMode("cover");
                    setMediaOpen(true);
                  }}
                >
                  + เลือกหน้าปก
                </button>
              )}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-500">ชื่อ</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2"
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Preview</label>
            <textarea
              className="mt-1 w-full border rounded-lg px-3 py-2"
              rows={2}
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm text-gray-500">เนื้อหา</label>

            {currentType === 3 && (
              <JobEditor value={content as JobContent} onChange={setContent} />
            )}

            {currentType === 2 && (
              <>
                <div className="flex justify-between mb-2">
                  <button
                    type="button"
                    className="text-sm text-blue-600"
                    onClick={() => {
                      setSelectMode("images");
                      setMediaOpen(true);
                    }}
                  >
                    เลือกรูปจากคลัง
                  </button>

                  <span className="text-sm text-gray-500">
                    เลือกแล้ว {images.length} / {MAX_IMAGES}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={`${img}-${idx}`} className="relative">
                      <div className="aspect-video rounded-lg overflow-hidden border">
                        <img
                          src={resolveImageUrl(img)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-black/60 text-white
                                   rounded-full w-8 h-8 flex items-center justify-center"
                        onClick={() => {
                          const next = [...images];
                          next.splice(idx, 1);
                          setContent({ images: next });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {currentType !== 2 && currentType !== 3 && (
              <textarea
                className="mt-1 w-full border rounded-lg px-3 py-2"
                rows={6}
                value={content as string}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
            <span className="text-sm">เปิดใช้งาน</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            ยกเลิก
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-5 py-2 bg-black text-white rounded disabled:opacity-50"
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>

      {mediaOpen && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-4xl p-4">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">
                {selectMode === "cover" ? "เลือกหน้าปก" : "เลือกรูปกิจกรรม"}
              </h3>
              <button onClick={() => setMediaOpen(false)}>✕</button>
            </div>

            <div className="grid grid-cols-4 gap-3 max-h-[60vh] overflow-auto">
              {mediaImages.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => {
                    if (selectMode === "cover") {
                      setCoverImage(file.imagePath);
                      setMediaOpen(false);
                      return;
                    }

                    if (images.length >= MAX_IMAGES) {
                      alert("เลือกได้สูงสุด 12 รูป");
                      return;
                    }

                    setContent({
                      images: [...images, file.imagePath],
                    });
                    setMediaOpen(false);
                  }}
                >
                  <img
                    src={resolveImageUrl(file.imagePath)}
                    className="h-32 w-full object-cover rounded border hover:ring-2 ring-black"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
