"use client";

import { useState } from "react";
import ImageUploadBox from "./ImageUploadBox";
import { useImageManager } from "@app/admin/hooks/useImageManager";

export default function MasterImageManager() {
  const [file, setFile] = useState<File | null>(null);
  // เรียกใช้ Logic จาก Hook
  const {
    files,
    loading,
    lastUploaded,
    deletingId,
    uploadImage,
    deleteImage,
    API_URL,
  } = useImageManager();

  const handleUploadClick = async () => {
    if (!file) return;
    const success = await uploadImage(file);
    if (success) {
      setFile(null);
    }
  };
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white shadow-sm p-6 space-y-6">
          <div className="rounded-xl border border-dashed border-gray-300 p-6 bg-gray-50">
            <ImageUploadBox file={file} onChange={setFile} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setFile(null)}
              disabled={!file || loading}
              className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            >
              ล้างค่า
            </button>
            <button
              onClick={handleUploadClick}
              disabled={!file || loading}
              className="px-6 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-black disabled:opacity-40"
            >
              {loading ? "กำลังอัปโหลด..." : "บันทึกรูป"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white border rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                📂 รูปภาพใน Server
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                ไฟล์ที่ถูกอัปโหลดแล้วทั้งหมด
              </p>
            </div>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full border">
              ทั้งหมด {files.length} รูป
            </span>
          </div>
          {files.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
              ยังไม่มีไฟล์ในระบบ
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <ul className="divide-y text-sm font-mono">
                {files.map((f) => {
                  const isNew = f.id === lastUploaded;
                  const isDeleting = f.id === deletingId;
                  const raw = (f.imagePath || "").trim();
                  const imageUrl = raw.startsWith("http")
                    ? raw
                    : raw.includes("images-upload")
                    ? `${API_URL}${raw.startsWith("/") ? "" : "/"}${raw}`
                    : `${API_URL}/images-upload/${raw.replace(/^\//, "")}`;

                  const displayName = raw.split("/").pop() || "Unknown";
                  return (
                    <li
                      key={f.id}
                      className={`px-4 py-3 flex items-center justify-between group transition-colors ${
                        isNew ? "bg-green-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-12 w-12 flex-shrink-0 border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt={displayName}
                            className={`h-full w-full object-cover transition-opacity ${
                              isDeleting ? "opacity-50" : "opacity-100"
                            }`}
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.display = "none";
                            }}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span
                            className={`truncate font-medium ${
                              isNew ? "text-green-700" : "text-gray-700"
                            }`}
                          >
                            {displayName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isNew && (
                          <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold border border-green-200">
                            NEW
                          </span>
                        )}
                        <button
                          onClick={() => deleteImage(f.id)}
                          disabled={isDeleting || loading}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                          title="ลบรูปภาพ"
                        >
                          {isDeleting ? (
                            <svg
                              className="animate-spin h-4 w-4 text-red-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
