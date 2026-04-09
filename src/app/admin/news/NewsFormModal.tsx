"use client";

import { useEffect, useState } from "react";
import { JobEditor } from "./JobEditor";
import { createEmptyJob } from "@app/utils/job";
import { JobContent } from "@/types/jobcontent";
import { resolveImageUrl, useMediaImages } from "../hook/useMediaImages";
import { useAdminLang } from "../(components)/AdminLangContext";

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

  const [titleEn, setTitleEn] = useState("");
  const [previewEn, setPreviewEn] = useState("");

  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectMode, setSelectMode] = useState<"cover" | "images">("images");

  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentType = news?.isEvents ?? defaultType;

  const [mediaOpen, setMediaOpen] = useState(false);
  const { files: mediaImages } = useMediaImages();
  const { lang } = useAdminLang();

  const finalContent =
    currentType === 2 || currentType === 3
      ? JSON.stringify(buildNewsContent(currentType, content))
      : String(content ?? "");

  const validateJob = (job: JobContent) => {
    const newErrors: Record<string, string> = {};

    if (!job.jobTitle.th.trim())
      newErrors["jobTitle.th"] = "กรุณากรอกชื่อตำแหน่งภาษาไทย";
    if (!job.jobTitle.en.trim())
      newErrors["jobTitle.en"] = "Please enter the job title in English";

    if (!job.jobType.th.trim())
      newErrors["jobType.th"] = "กรุณากรอกประเภทงานภาษาไทย";
    if (!job.jobType.en.trim())
      newErrors["jobType.en"] = "Please enter the job type in English";

    if (!job.numberOfPositions || job.numberOfPositions <= 0) {
      newErrors["numberOfPositions"] = "กรุณากรอกจำนวนอัตราให้มากกว่า 0";
    }

    if (!job.location.province.th.trim()) {
      newErrors["location.province.th"] = "กรุณากรอกจังหวัดภาษาไทย";
    }

    if (!job.location.province.en.trim()) {
      newErrors["location.province.en"] = "Please enter province in English";
    }

    return newErrors;
  };

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

    setTitleEn(news.newsTitleEn ?? "");
    setPreviewEn(news.previewEn ?? "");

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
    const currentTitle = lang === "en" ? titleEn : title;
    if (!currentTitle.trim()) return;

    if (currentType === 3) {
      const errors = validateJob(content as JobContent);

      if (Object.keys(errors).length > 0) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        console.log(errors); // debug ดูว่าขาดอะไร
        return;
      }
    }

    setLoading(true);
    const isEdit = Boolean(news?.newsId);

    const formData = new FormData();
    formData.append("newsTitle", title);
    formData.append("newsTitleEn", titleEn);

    formData.append("preview", preview);
    formData.append("previewEn", previewEn);

    formData.append("newsContent", finalContent);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {news?.newsId ? "แก้ไขรายการ" : "เพิ่มรายการ"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
          {currentType !== 3 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                หน้าปกข่าว
              </label>

              {coverImage ? (
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 aspect-video">
                  <img
                    src={resolveImageUrl(coverImage)}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-sm text-white transition hover:bg-black"
                    onClick={() => setCoverImage(null)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-500 transition hover:border-black hover:bg-gray-100 hover:text-black"
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {lang === "en" ? "ชื่อ (EN)" : "ชื่อ"}
            </label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black"
              rows={2}
              value={lang === "en" ? titleEn : title}
              onChange={(e) =>
                lang === "en"
                  ? setTitleEn(e.target.value)
                  : setTitle(e.target.value)
              }
              placeholder={
                lang === "en" ? "Enter news title (EN)" : "กรอกชื่อข่าว"
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {lang === "en" ? "Preview (EN)" : "Preview"}
            </label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black"
              rows={3}
              value={lang === "en" ? previewEn : preview}
              onChange={(e) =>
                lang === "en"
                  ? setPreviewEn(e.target.value)
                  : setPreview(e.target.value)
              }
              placeholder={
                lang === "en"
                  ? "Enter preview text (EN)"
                  : "กรอกข้อความ preview"
              }
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {lang === "en" ? "Content (EN)" : "เนื้อหา"}
            </label>

            {currentType === 3 && (
              <div className="rounded-2xl border border-gray-200 p-3">
                <JobEditor
                  value={content as JobContent}
                  onChange={setContent}
                />
              </div>
            )}

            {currentType === 2 && (
              <>
                <div className="mb-2 flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
                    onClick={() => {
                      setSelectMode("images");
                      setMediaOpen(true);
                    }}
                  >
                    {lang === "en"
                      ? "Select Images from Library"
                      : "เลือกรูปจากคลัง"}
                  </button>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {lang === "en"
                      ? `Selected ${images.length} of ${MAX_IMAGES}`
                      : `เลือกแล้ว ${images.length} / ${MAX_IMAGES}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((img, idx) => (
                    <div key={`${img}-${idx}`} className="relative">
                      <div className="aspect-video overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                        <img
                          src={resolveImageUrl(img)}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white transition hover:bg-black"
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black"
                rows={6}
                value={content as string}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  lang === "en" ? "Enter content (EN)" : "กรอกเนื้อหา"
                }
              />
            )}
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">
              {lang === "en" ? "เปิดใช้งาน (Enable)" : "เปิดใช้งาน"}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            {lang === "en" ? "ยกเลิก (Cancel)" : "ยกเลิก"}
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>

      {mediaOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {selectMode === "cover" ? "เลือกหน้าปก" : "เลือกรูปกิจกรรม"}
              </h3>
              <button
                onClick={() => setMediaOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-auto sm:grid-cols-3 md:grid-cols-4">
              {mediaImages.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:scale-[1.01] hover:shadow-md"
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
                    className="h-32 w-full object-cover"
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
