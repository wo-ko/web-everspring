"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NewsTable from "./NewsTable";
import NewsFormModal from "./NewsFormModal";
import { createEmptyJob } from "@app/utils/job";
import { NewsType } from "@/types/jobcontent";

const TYPE_OPTIONS: { type: NewsType; label: string }[] = [
  { type: "press", label: "ข่าวสาร" },
  { type: "events", label: "กิจกรรม" },
  { type: "career", label: "ตำแหน่งงาน" },
];

const TYPE_MAP: Record<NewsType, number> = {
  press: 1,
  events: 2,
  career: 3,
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

export default function NewsManager({
  initialType,
}: {
  initialType: NewsType;
}) {
  const router = useRouter();

  const [type, setType] = useState<NewsType>(initialType);
  const [allNews, setAllNews] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  async function fetchNews() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAllNews(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  const news = useMemo(() => {
    return allNews.filter((n) => {
      if (n.isEvents !== TYPE_MAP[type]) return false;

      if (!search.trim()) return true;

      const kw = search.toLowerCase();
      return (
        n.newsTitle?.toLowerCase().includes(kw) ||
        n.preview?.toLowerCase().includes(kw)
      );
    });
  }, [allNews, type, search]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          {TYPE_OPTIONS.find((t) => t.type === type)?.label}
        </h1>

        <button
          type="button"
          onClick={() => {
            setEditing({
              isEvents: TYPE_MAP[type],
              newsTitle: "",
              preview: "",
              newsContent: type === "career" ? createEmptyJob() : "",
              isEnabled: true,
            });
          }}
          className="h-9 px-4 bg-black text-white rounded-lg text-sm"
        >
          + เพิ่ม
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={type}
          onChange={(e) => {
            const nextType = e.target.value as NewsType;
            setType(nextType);
            setEditing(null);
            router.push(`/admin/news?type=${nextType}`);
          }}
          className="h-9 w-40 border rounded-lg px-2 text-sm bg-white"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.type} value={o.type}>
              {o.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="ค้นหาชื่อ / preview…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-56 border rounded-lg px-3 text-sm"
        />

        <div className="ml-auto text-xs text-gray-500">
          {news.length} รายการ
        </div>
      </div>

      <div className="bg-white border rounded-xl p-3">
        <NewsTable
          loading={loading}
          news={news}
          onEdit={(n) => setEditing(n)}
          onDeleted={fetchNews}
        />
      </div>

      {editing && (
        <NewsFormModal
          key={editing.newsId ?? `new-${type}`}
          news={editing}
          defaultType={TYPE_MAP[type]}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            fetchNews();
          }}
        />
      )}
    </div>
  );
}
