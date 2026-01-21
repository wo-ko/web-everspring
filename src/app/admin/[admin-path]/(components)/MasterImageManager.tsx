"use client";

import { useEffect, useState } from "react";
import ImageUploadBox from "./ImageUploadBox";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ServerFile {
  id: number;
  filename: string;
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
  const [lastUploaded, setLastUploaded] = useState<number | null>(null);

  async function fetchFiles() {
    const res = await fetch(`http://212.80.215.83:8520/images`);
    const json = await res.json();

    const list: ServerFile[] = Array.isArray(json)
      ? json
      : Array.isArray(json.data)
      ? json.data
      : [];

    setFiles(list);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const base64 = await fileToBase64(file);

      const res = await fetch(`${API_URL}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const result = await res.json();
      setLastUploaded(result.id);

      setFile(null);
      await fetchFiles();
    } catch (err) {
      console.error(err);
      alert("อัปโหลดล้มเหลว");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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

                  return (
                    <li
                      key={f.id}
                      className={`px-4 py-2 flex items-center justify-between ${
                        isNew
                          ? "bg-green-50 text-green-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="truncate">{f.filename}</span>

                      {isNew && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100">
                          NEW
                        </span>
                      )}
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
