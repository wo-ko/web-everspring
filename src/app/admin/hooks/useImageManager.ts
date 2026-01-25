import { ServerFile } from "@/types/image";
import { useState, useEffect, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_FILE_MB = 1;

export function useImageManager() {
  const [files, setFiles] = useState<ServerFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUploaded, setLastUploaded] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
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
  }, []);
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadImage = async (file: File) => {
    const MAX_SIZE_BYTES = MAX_FILE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(
        `❌ อัปโหลดไม่ได้: ไฟล์มีขนาดใหญ่เกินไป\n\nขนาดไฟล์ของคุณ: ${fileSizeMB} MB\nขนาดที่อนุญาตสูงสุด: ${MAX_FILE_MB} MB`
      );
      return false; 
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("images", file);
      const res = await fetch(`${API_URL}/images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
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
      const newFileId = result.images
        ? result.images[0].id
        : result.image?.id || result.id;
        
      setLastUploaded(newFileId);
      await fetchFiles();
      return true; 

    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("คุณต้องการลบรูปภาพนี้ใช่หรือไม่?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/images`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageIds: [id],
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      await fetchFiles();
    } catch (err) {
      console.error("Delete error:", err);
      alert("ลบรูปภาพไม่สำเร็จ");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    files,
    loading,
    lastUploaded,
    deletingId,
    fetchFiles,
    uploadImage,
    deleteImage,
    API_URL 
  };
}