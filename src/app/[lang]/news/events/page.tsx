"use client";

import { useEffect, useState } from "react";
import ActivitiesSection from "../../components/activities-section";
import ImageViewerModal from "@app/[lang]/components/ImageViewerModal";
import { ActivityUI, EventNewsItem } from "@/types/jobcontent";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

export default function Events() {
  const [activities, setActivities] = useState<ActivityUI[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<ActivityUI | null>(null);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data: EventNewsItem[] = await res.json();

        const filtered = (data ?? []).filter(
          (i) => i.isEvents === 2 && Number(i.isEnabled) === 0
        );

        const mapped: ActivityUI[] = filtered.map((i) => {
          const content =
            typeof i.newsContent === "string"
              ? JSON.parse(i.newsContent)
              : i.newsContent ?? {};

          return {
            id: i.newsId,

            imageUrl: i.imgUrl ?? "",

            images: Array.isArray(content.images) ? content.images : [],

            title: { th: i.newsTitle ?? "", en: i.newsTitle ?? "" },
            description: {
              th: i.preview ?? "",
              en: i.preview ?? "",
            },
          };
        });

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
        titles={{ th: "กิจกรรม", en: "Events" }}
        activities={activities}
        onClick={(item) => {
          setSelected(item);
          setGalleryOpen(true);
        }}
      />
      {galleryOpen && selected && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-xl font-semibold">
                  {selected.title.th}
                </h3>
                <p className="text-white/70 text-sm">
                  {selected.images?.length ?? 0} รูป
                </p>
              </div>

              <button
                onClick={() => setGalleryOpen(false)}
                className="
                text-white text-xl
                w-10 h-10 rounded-full
                flex items-center justify-center 
                hover:bg-white/20 transition
                "
              >
                ✕
              </button>
            </div>

            <div
              className="
              grid gap-4
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              "
            >
              {selected.images?.map((img, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setViewerIndex(index);
                    setViewerOpen(true);
                  }}
                  className="
                  group relative cursor-pointer
                  rounded-xl overflow-hidden
                  bg-white
                  aspect-[4/3]
                  shadow-md
                  hover:shadow-xl
                  transition-all duration-200
                  "
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition">
                      คลิกเพื่อดูรูป
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ImageViewerModal
        open={viewerOpen}
        images={selected?.images ?? []}
        startIndex={viewerIndex}
        onClose={() => setViewerOpen(false)}
      />
    </main>
  );
}
