"use client";

import { useEffect, useState } from "react";
import ImageUploadBox from "./ImageUploadBox";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface ServerFile {
  id: string;
  createdAt?: string;
  imagePath: string;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("convert error");
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MasterImageManager() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<ServerFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUploaded, setLastUploaded] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

async function fetchFiles() {
    try {
      const res = await fetch(`${API_URL}/images`);
      const json = await res.json();

      let rawList: any[] = [];
      if (Array.isArray(json)) {
        rawList = json;
      } else if (json.data && Array.isArray(json.data)) {
        rawList = json.data;
      }
      const list: ServerFile[] = rawList.map((item) => ({
        id: item.imageId || item.id,
        imagePath: item.imagePath,
      }));
      setFiles(list);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const MAX_FILE_SIZE_MB = 5;
    const MAX_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(
        `❌ อัปโหลดไม่ได้: ไฟล์มีขนาดใหญ่เกินไป\n\nขนาดไฟล์ของคุณ: ${fileSizeMB} MB\nขนาดที่อนุญาตสูงสุด: ${MAX_FILE_SIZE_MB} MB`
      );
      return; // จบการทำงานทันที ไม่ต้องโหลด หรือแปลงไฟล์ต่อ
    }
    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch(`${API_URL}/images/base64`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: base64,
          type: file.name.split(".").pop(),
        }),
      });
      if (!res.ok) {
        // ดักจับ Error จาก Server (เช่น 413 หรือ Error อื่นๆ)
        if (res.status === 413) {
          throw new Error("ไฟล์ใหญ่เกินกว่าที่ Server จะรับได้ (HTTP 413)");
        }
        let errorMessage = "เกิดข้อผิดพลาดในการอัปโหลด";
        try {
          const errorData = await res.json();
          if (errorData.message) errorMessage = errorData.message;
        } catch (e) {
          errorMessage = `Upload failed (Status: ${res.status})`;
        }
        throw new Error(errorMessage);
      }
      const result = await res.json();
      setLastUploaded(result.image.id);
      setFile(null);
      await fetchFiles();
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณต้องการลบรูปภาพนี้ใช่หรือไม่?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageIds: [id], // ส่งเป็น array ตามที่ Backend ต้องการ
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      // 2. ลบสำเร็จ -> โหลดข้อมูลใหม่
      await fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
      alert("ลบรูปภาพไม่สำเร็จ");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ===== LEFT: Upload Box ===== */}
        <div className="lg:col-span-2 bg-white shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              อัปโหลดรูปใหม่
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              รองรับ JPG, PNG • แนะนำขนาดไม่เกิน 5MB
            </p>
          </div>
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
              onClick={handleUpload}
              disabled={!file || loading}
              className="px-6 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-black disabled:opacity-40"
            >
              {loading ? "กำลังอัปโหลด..." : "บันทึกรูป"}
            </button>
          </div>
        </div>
        {/* ===== RIGHT: File List ===== */}
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
            <span className="text-xs text-gray-400">{files.length} files</span>
          </div>
          {files.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
              ยังไม่มีไฟล์ในระบบ
            </div>
          ) : (
            <div className="flex-1 border rounded-lg overflow-hidden">
              <ul className="divide-y text-sm font-mono">
                {files.map((f) => {
                  const isNew = f.id === lastUploaded;
                  const isDeleting = f.id === deletingId; // เช็คว่ารูปนี้กำลังถูกลบหรือไม่

                  // จัดการ URL ตามโค้ดเดิมของคุณ
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
                      {/* ส่วนแสดงรูปและชื่อไฟล์ */}
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="h-12 w-12 flex-shrink-0 border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt={displayName}
                            className={`h-full w-full object-cover transition-opacity ${
                              isDeleting ? "opacity-50" : "opacity-100"
                            }`}
                            onError={(e) => {
                              console.log("IMG ERROR:", imageUrl);
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

                      {/* ส่วนปุ่มลบและป้าย NEW */}
                      <div className="flex items-center gap-3">
                        {isNew && (
                          <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold border border-green-200">
                            NEW
                          </span>
                        )}

                        {/* ปุ่มลบ */}
                        <button
                          onClick={() => handleDelete(f.id)}
                          disabled={isDeleting || loading} // ห้ามกดถ้ากำลังลบ หรือกำลังโหลด
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                          title="ลบรูปภาพ"
                        >
                          {isDeleting ? (
                            // Loading Icon ขณะลบ
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
                            // Trash Icon
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
