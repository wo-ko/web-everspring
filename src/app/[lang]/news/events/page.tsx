"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import ActivitiesSection from "../../components/activities-section";
import ImageViewerModal from "@app/[lang]/components/ImageViewerModal";
import { ActivityUI, EventNewsItem } from "@/types/jobcontent";
import { resolveImageUrl } from "@app/admin/hook/useMediaImages";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

type EventContent = {
  images?: string[];
};

export default function Events() {
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "th";

  const [activities, setActivities] = useState<ActivityUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ActivityUI | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const res = await fetch(API_URL, { cache: "no-store" });
        const data: EventNewsItem[] = await res.json();

        const filtered = (data ?? []).filter(
          (item) => item.isEvents === 2 && Number(item.isEnabled) === 0,
        );

        const mapped: ActivityUI[] = filtered.map((item) => {
          let parsedContent: EventContent = {};

          try {
            parsedContent =
              typeof item.newsContent === "string"
                ? JSON.parse(item.newsContent)
                : (item.newsContent ?? {});
          } catch (error) {
            console.error("parse event content error:", error);
            parsedContent = {};
          }

          return {
            id: item.newsId,
            imageUrl: item.imgUrl ?? "",
            images: Array.isArray(parsedContent.images)
              ? parsedContent.images
              : [],
            title: {
              th: item.newsTitle ?? "",
              en: item.newsTitleEn ?? "",
            },
            description: {
              th: item.preview ?? "",
              en: item.previewEn ?? "",
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

  const selectedImages = useMemo(() => selected?.images ?? [], [selected]);

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
        {lang === "en" ? "Loading events..." : "กำลังโหลดข้อมูล..."}
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <ActivitiesSection
        titles={{ th: "กิจกรรม", en: "Events" }}
        activities={activities}
        onClick={(item) => {
          setSelected(item);
          setGalleryOpen(true);
        }}
      />

      {galleryOpen && selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {lang === "en" ? selected.title.en : selected.title.th}
                </h3>

                {!!(lang === "en"
                  ? selected.description.en
                  : selected.description.th) && (
                  <p className="mt-2 max-w-2xl text-sm text-white/70">
                    {lang === "en"
                      ? selected.description.en
                      : selected.description.th}
                  </p>
                )}

                <span className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                  {lang === "en"
                    ? `${selectedImages.length} images`
                    : `${selectedImages.length} รูป`}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setGalleryOpen(false);
                  setSelected(null);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white transition hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            {selectedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {selectedImages.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => {
                      setViewerIndex(index);
                      setViewerOpen(true);
                    }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
                  >
                    <img
                      src={resolveImageUrl(img)}
                      alt={`event-image-${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                      <span className="text-sm text-white opacity-0 transition group-hover:opacity-100">
                        {lang === "en" ? "Click to view" : "คลิกเพื่อดูรูป"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-8 text-center text-sm text-white/70">
                {lang === "en"
                  ? "No images available for this event."
                  : "ไม่พบรูปภาพสำหรับกิจกรรมนี้"}
              </div>
            )}
          </div>
        </div>
      )}

      <ImageViewerModal
        open={viewerOpen}
        images={selectedImages}
        startIndex={viewerIndex}
        onClose={() => setViewerOpen(false)}
      />
    </main>
  );
}
