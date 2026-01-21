"use client";

import { useEffect, useState } from "react";
import { JobEditor } from "./JobEditor";
import { createEmptyJob } from "@app/utils/job";
import { JobContent } from "@/types/jobcontent";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;
const MEDIA_API = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/media`;

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
    defaultType === 2 ? { images: [] } : ""
  );

  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentType = news?.isEvents ?? defaultType;

  const [mediaImages, setMediaImages] = useState<string[]>([]);
  const [mediaOpen, setMediaOpen] = useState(false);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch(MEDIA_API);
        const data = await res.json();
        setMediaImages(data ?? []);
      } catch (e) {
        console.error("load media error", e);
      }
    }

    fetchMedia();
  }, []);

  useEffect(() => {
    if (!news) return;

    setTitle(news.newsTitle ?? "");
    setPreview(news.preview ?? "");
    setIsEnabled(Boolean(news.isEnabled));

    // สมัครงาน
    if (currentType === 3) {
      const parsed =
        typeof news.newsContent === "string"
          ? JSON.parse(news.newsContent)
          : news.newsContent;

      setContent(
        Array.isArray(parsed) ? parsed[0] : parsed ?? createEmptyJob()
      );
      return;
    }

    // กิจกรรม
    if (currentType === 2) {
      const parsed =
        typeof news.newsContent === "string"
          ? JSON.parse(news.newsContent)
          : news.newsContent;

      setContent({ images: parsed?.images ?? [] });
      return;
    }

    // ข่าวทั่วไป
    setContent(news.newsContent ?? "");
  }, [news, currentType]);

  /* ---------------- submit ---------------- */
  async function submit() {
    if (!title.trim()) return;

    setLoading(true);

    const isEdit = Boolean(news?.newsId);

    const formData = new FormData();
    formData.append("newsTitle", title);
    formData.append("preview", preview);
    formData.append(
      "newsContent",
      JSON.stringify(buildNewsContent(currentType, content))
    );
    formData.append("isEnabled", String(isEnabled ? 0 : 1));
    formData.append("isEvents", String(currentType));

    const url = isEdit ? `${API_URL}/update/${news.newsId}` : `${API_URL}/add`;

    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      body: formData,
    });

    setLoading(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">
            {news?.newsId ? "แก้ไขรายการ" : "เพิ่มรายการ"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
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

          <div>
            <label className="text-sm text-gray-500">เนื้อหา</label>

            {/* สมัครงาน */}
            {currentType === 3 && (
              <JobEditor value={content as JobContent} onChange={setContent} />
            )}

            {/* กิจกรรม */}
            {currentType === 2 && (
              <>
                <button
                  type="button"
                  className="text-sm text-blue-600 mb-2"
                  onClick={() => setMediaOpen(true)}
                >
                  เลือกรูปจากคลัง
                </button>

                <div className="grid grid-cols-4 gap-3">
                  {(content as EventContent).images.map((img, idx) => (
                    <div key={img} className="relative">
                      <img
                        src={img}
                        className="h-32 w-full object-cover rounded border"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2"
                        onClick={() => {
                          const images = [...(content as EventContent).images];
                          images.splice(idx, 1);
                          setContent({ images });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ข่าว */}
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
              <h3 className="font-semibold">เลือกรูปจากคลัง</h3>
              <button onClick={() => setMediaOpen(false)}>✕</button>
            </div>

            <div className="grid grid-cols-4 gap-3 max-h-[60vh] overflow-auto">
              {mediaImages.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => {
                    setContent({
                      images: [...(content as EventContent).images, img],
                    });
                    setMediaOpen(false);
                  }}
                >
                  <img
                    src={img}
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
