"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

        const filtered = (data ?? []).filter(
          (item) => item.isEvents === 1 && Number(item.isEnabled) === 0,
        );

        const mapped: ActivityUI[] = filtered.map((item) => ({
          id: item.newsId,
          imageUrl: item.imgUrl ?? "",
          title: {
            th: item.newsTitle ?? "",
            en: item.newsTitleEn ?? item.newsTitle ?? "",
          },
          description: {
            th: item.preview ?? "",
            en: item.previewEn ?? item.preview ?? "",
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
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
        {lang === "en" ? "Loading news..." : "กำลังโหลดข้อมูล..."}
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <ActivitiesSection
        titles={{ th: "ข่าวสาร", en: "News" }}
        activities={activities}
      />
    </main>
  );
}
