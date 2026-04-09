"use client";

import { ActivityUI, EventPressItem } from "@/types/jobcontent";
import ActivitiesSection from "@app/[lang]/components/activities-section";
import { useEffect, useState } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

export default function Press() {
  const [activities, setActivities] = useState<ActivityUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data: EventPressItem[] = await res.json();

        const filtered = (data ?? []).filter(
          (i) => i.isEvents === 1 && Number(i.isEnabled) === 0,
        );

        const mapped: ActivityUI[] = filtered.map((i) => ({
          id: i.newsId,
          imageUrl: i.imgUrl ?? "",
          title: { th: i.newsTitle ?? "", en: i.newsTitle ?? "" },
          description: {
            th: i.preview ?? "",
            en: i.preview ?? "",
          },
          // linkUrl: `/events/${i.newsId}`,
        }));

        setActivities(mapped);
      } catch (error) {
        console.error("fetch events error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-sm text-gray-500">กำลังโหลดข้อมูล…</div>;
  }

  return (
    <main>
      <ActivitiesSection
        titles={{ th: "ข่าวสาร", en: "News" }}
        activities={activities}
      />
    </main>
  );
}
