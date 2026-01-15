"use client";

import { useEffect, useState } from "react";
import { JobEditor } from "./JobEditor";
import { createEmptyJob } from "@app/utils/job";
import { JobContent } from "@/types/jobcontent";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

type Props = {
  news: any;
  defaultType: number;
  onClose: () => void;
  onSaved: () => void;
};

function buildNewsContent(type: number, content: string | JobContent) {
  if (type === 3) {
    return Array.isArray(content) ? content : [content];
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
  const [content, setContent] = useState<string | JobContent>("");
  const [isEnabled, setIsEnabled] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const currentType = news?.isEvents ?? defaultType;
  const isImageSupported = currentType !== 3; // สมัครงานไม่ใช้รูป

  useEffect(() => {
    if (!news) return;

    setTitle(news.newsTitle ?? "");
    setPreview(news.preview ?? "");
    setIsEnabled(Boolean(news.isEnabled));

    if (isImageSupported && news.imageUrl) {
      setImagePreview(news.imageUrl);
    }

    if (currentType === 3) {
      if (news.newsContent) {
        const parsed =
          typeof news.newsContent === "string"
            ? JSON.parse(news.newsContent)
            : news.newsContent;

        // backend เก็บเป็น array → editor ใช้ตัวเดียว
        setContent(Array.isArray(parsed) ? parsed[0] : parsed);
      } else {
        setContent(createEmptyJob());
      }
    } else {
      // ข่าว / กิจกรรม
      setContent(news.newsContent ?? "");
    }
  }, [news, currentType, isImageSupported]);

  async function submit() {
    if (!title.trim()) return;

    setLoading(true);

    const isEdit = Boolean(news?.newsId);
    const isJob = currentType === 3;

    const formData = new FormData();

    formData.append("newsTitle", title);
    formData.append("preview", preview);

    const payloadContent = buildNewsContent(currentType, content);
    formData.append("newsContent", JSON.stringify(payloadContent));

    formData.append("isEnabled", String(isEnabled ? 0 : 1));
    formData.append("isEvents", String(currentType));

    if (isJob) {
      formData.append("imgUrl", "");
    } else {
      if (imageFile) {
        formData.append("image", imageFile);
      }
    }

    const url = isEdit ? `${API_URL}/update/${news.newsId}` : `${API_URL}/add`;

    const method = isEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
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
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-xl"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {isImageSupported && (
            <div>
              <label className="text-sm text-gray-500">รูปภาพ</label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-2 h-40 rounded-lg object-cover border"
                />
              )}

              <input
                type="file"
                accept="image/*"
                className="mt-2 block text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }}
              />
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

          <div>
            <label className="text-sm text-gray-500">เนื้อหา</label>

            {currentType === 3 ? (
              <JobEditor value={content as JobContent} onChange={setContent} />
            ) : (
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

        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-black text-white disabled:opacity-50"
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}
