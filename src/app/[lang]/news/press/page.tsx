"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Newspaper, Loader2 } from "lucide-react";
import { ActivityUI, EventPressItem } from "@/types/jobcontent";
import ActivitiesSection from "@app/[lang]/components/activities-section";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

export default function Press() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "th";

  const [activities, setActivities] = useState<ActivityUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPress() {
      try {
        setLoading(true);
        const res = await fetch(API_URL, { cache: "no-store" });
        const data: EventPressItem[] = await res.json();

        // กรองข้อมูล: isEvents === 1 คือ ข่าวสาร, isEnabled === 0 คือ เปิดใช้งาน
        const filtered = (data ?? []).filter(
          (item) => item.isEvents === 1 && Number(item.isEnabled) === 0,
        );

        const mapped: ActivityUI[] = filtered.map((item) => ({
          id: item.newsId,
          imageUrl: item.imgUrl ?? "",
          title: {
            th: item.newsTitle ?? "",
            en: item.newsTitleEn || item.newsTitle || "",
          },
          description: {
            th: item.preview ?? "",
            en: item.previewEn || item.preview || "",
          },
        }));

        setActivities(mapped);
      } catch (error) {
        console.error("fetch press error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPress();
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-12 animate-pulse space-y-10">
        <div className="h-10 w-48 bg-gray-200 rounded-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-4">
              <div className="aspect-[16/9] bg-gray-200 rounded-2xl w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[20vh] bg-transparent">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {activities.length > 0 ? (
          <div className="pt-8">
            <ActivitiesSection
              titles={{
                th: "ข่าวสารและประชาสัมพันธ์",
                en: "Press & News",
              }}
              activities={activities}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <Newspaper className="w-12 h-12 opacity-20" />
            </div>
            <p className="text-lg font-medium">
              {lang === "en" ? "No news found" : "ไม่พบข้อมูลข่าวสารในขณะนี้"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
