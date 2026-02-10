"use client";

import { useEffect, useState, useCallback } from "react";

export interface ServerFile {
  id: string;
  imagePath: string;
}

export function useMediaImages() {
  const [files, setFiles] = useState<ServerFile[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const fetchFiles = useCallback(async () => {
    const res = await fetch(`${API_URL}/images`);
    const json = await res.json();

    const list: ServerFile[] = (
      Array.isArray(json) ? json : (json.data ?? [])
    ).map((item: any) => ({
      id: item.imageId || item.id,
      imagePath: item.imagePath,
    }));

    setFiles(list);
  }, [API_URL]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, fetchFiles, API_URL };
}

export function resolveImageUrl(path?: string) {
  if (!path) return "";

  if (path.startsWith("http")) return path;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (path.includes("images-upload")) {
    return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  }
  return `${API_URL}/images-upload/${path.replace(/^\//, "")}`;
}

export function renderImageUrl(path?: string, key?: string | number) {
  if (!path) return undefined;
  const base = resolveImageUrl(path);
  return `${base}?v=${key ?? Date.now()}`;
}
