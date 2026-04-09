// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "next/navigation";
// import ActivitiesSection from "../../components/activities-section";
// import ImageViewerModal from "@app/[lang]/components/ImageViewerModal";
// import { ActivityUI, EventNewsItem } from "@/types/jobcontent";
// import { resolveImageUrl } from "@app/admin/hook/useMediaImages";

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

// type EventContent = {
//   images?: string[];
// };

// export default function Events() {
//   const params = useParams();
//   const lang = params?.lang === "en" ? "en" : "th";

//   const [activities, setActivities] = useState<ActivityUI[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState<ActivityUI | null>(null);
//   const [galleryOpen, setGalleryOpen] = useState(false);
//   const [viewerOpen, setViewerOpen] = useState(false);
//   const [viewerIndex, setViewerIndex] = useState(0);

//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         setLoading(true);

//         const res = await fetch(API_URL, { cache: "no-store" });
//         const data: EventNewsItem[] = await res.json();

//         const filtered = (data ?? []).filter(
//           (item) => item.isEvents === 2 && Number(item.isEnabled) === 0,
//         );

//         const mapped: ActivityUI[] = filtered.map((item) => {
//           let parsedContent: EventContent = {};

//           try {
//             parsedContent =
//               typeof item.newsContent === "string"
//                 ? JSON.parse(item.newsContent)
//                 : (item.newsContent ?? {});
//           } catch (error) {
//             console.error("parse event content error:", error);
//             parsedContent = {};
//           }

//           return {
//             id: item.newsId,
//             imageUrl: item.imgUrl ?? "",
//             images: Array.isArray(parsedContent.images)
//               ? parsedContent.images
//               : [],
//             title: {
//               th: item.newsTitle ?? "",
//               en: item.newsTitleEn ?? "",
//             },
//             description: {
//               th: item.preview ?? "",
//               en: item.previewEn ?? "",
//             },
//           };
//         });

//         setActivities(mapped);
//       } catch (error) {
//         console.error("fetch events error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchEvents();
//   }, []);

//   const selectedImages = useMemo(() => selected?.images ?? [], [selected]);

//   if (loading) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
//         {lang === "en" ? "Loading events..." : "กำลังโหลดข้อมูล..."}
//       </div>
//     );
//   }

//   return (
//     <main className="space-y-6">
//       <ActivitiesSection
//         titles={{ th: "กิจกรรม", en: "Events" }}
//         activities={activities}
//         onClick={(item) => {
//           setSelected(item);
//           setGalleryOpen(true);
//         }}
//       />

//       {galleryOpen && selected && (
//         <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
//           <div className="mx-auto max-w-7xl p-6">
//             <div className="mb-6 flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="text-xl font-semibold text-white">
//                   {lang === "en" ? selected.title.en : selected.title.th}
//                 </h3>

//                 {!!(lang === "en"
//                   ? selected.description.en
//                   : selected.description.th) && (
//                   <p className="mt-2 max-w-2xl text-sm text-white/70">
//                     {lang === "en"
//                       ? selected.description.en
//                       : selected.description.th}
//                   </p>
//                 )}

//                 <span className="mt-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
//                   {lang === "en"
//                     ? `${selectedImages.length} images`
//                     : `${selectedImages.length} รูป`}
//                 </span>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => {
//                   setGalleryOpen(false);
//                   setSelected(null);
//                 }}
//                 className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white transition hover:bg-white/20"
//               >
//                 ✕
//               </button>
//             </div>

//             {selectedImages.length > 0 ? (
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//                 {selectedImages.map((img, index) => (
//                   <button
//                     key={`${img}-${index}`}
//                     type="button"
//                     onClick={() => {
//                       setViewerIndex(index);
//                       setViewerOpen(true);
//                     }}
//                     className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
//                   >
//                     <img
//                       src={resolveImageUrl(img)}
//                       alt={`event-image-${index + 1}`}
//                       className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
//                     />
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
//                       <span className="text-sm text-white opacity-0 transition group-hover:opacity-100">
//                         {lang === "en" ? "Click to view" : "คลิกเพื่อดูรูป"}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-8 text-center text-sm text-white/70">
//                 {lang === "en"
//                   ? "No images available for this event."
//                   : "ไม่พบรูปภาพสำหรับกิจกรรมนี้"}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <ImageViewerModal
//         open={viewerOpen}
//         images={selectedImages}
//         startIndex={viewerIndex}
//         onClose={() => setViewerOpen(false)}
//       />
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { X, Eye, Image as ImageIcon, LayoutGrid } from "lucide-react";
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
            parsedContent = {};
          }

          return {
            id: item.newsId,
            imageUrl: item.imgUrl ?? "",
            images: Array.isArray(parsedContent.images)
              ? parsedContent.images
              : [],
            title: { th: item.newsTitle ?? "", en: item.newsTitleEn ?? "" },
            description: { th: item.preview ?? "", en: item.previewEn ?? "" },
          };
        });

        setActivities(mapped);
      } catch (error) {
        console.error("fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const selectedImages = useMemo(() => selected?.images ?? [], [selected]);

  // --- Loading State (Skeleton) ---
  if (loading) {
    return (
      <div className="w-full space-y-12 animate-pulse p-8">
        <div className="h-12 bg-gray-100 rounded-2xl w-1/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-64 bg-gray-100 rounded-[2.5rem]"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-transparent">
      {/* 1. รายการกิจกรรม */}
      <ActivitiesSection
        titles={{ th: "กิจกรรมล่าสุด", en: "Latest Events" }}
        activities={activities}
        onClick={(item) => {
          setSelected(item);
          setGalleryOpen(true);
          document.body.style.overflow = "hidden";
        }}
      />

      {/* 2. Gallery Overlay (Modern Light Version) */}
      {galleryOpen && selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 lg:p-12 animate-in fade-in zoom-in duration-300">
          {/* Backdrop: สว่างนวลๆ พร้อมเบลอ */}
          <div
            className="absolute inset-0 bg-slate-900/10 backdrop-blur-xl"
            onClick={() => {
              setGalleryOpen(false);
              document.body.style.overflow = "auto";
            }}
          />

          {/* Modal Content: เน้นขาวสะอาดและเงาฟุ้ง */}
          <div className="relative w-full max-w-6xl max-h-[85vh] overflow-hidden bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col">
            {/* Header */}
            <div className="px-8 py-8 border-b border-slate-50 flex justify-between items-start gap-6 bg-slate-50/30">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                    <LayoutGrid className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {lang === "en" ? selected.title.en : selected.title.th}
                  </h3>
                </div>

                <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
                  {lang === "en"
                    ? selected.description.en
                    : selected.description.th}
                </p>

                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-blue-600">
                  <ImageIcon className="w-3.5 h-3.5" />
                  {lang === "en"
                    ? `${selectedImages.length} Photos`
                    : `${selectedImages.length} รูปภาพ`}
                </div>
              </div>

              <button
                onClick={() => {
                  setGalleryOpen(false);
                  document.body.style.overflow = "auto";
                }}
                className="p-3 rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Gallery Area */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
              {selectedImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {selectedImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setViewerIndex(index);
                        setViewerOpen(true);
                      }}
                      className="group relative aspect-square overflow-hidden rounded-3xl border-4 border-slate-50 bg-slate-50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-blue-100"
                    >
                      <img
                        src={resolveImageUrl(img)}
                        alt="gallery"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Light Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-slate-300 italic">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
                  <p className="text-lg">
                    {lang === "en"
                      ? "Gallery is empty"
                      : "ไม่พบรูปภาพในอัลบั้ม"}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Placeholder (Optional) */}
            <div className="h-4 bg-slate-50/50"></div>
          </div>
        </div>
      )}

      {/* ส่วนดูรูปแบบเต็มจอ (ImageViewerModal มักจะเป็นสีดำเพื่อให้ภาพเด่น ซึ่งเป็นมาตรฐานปกติครับ) */}
      <ImageViewerModal
        open={viewerOpen}
        images={selectedImages}
        startIndex={viewerIndex}
        onClose={() => setViewerOpen(false)}
      />

      <style jsx global>{`
        /* ปรับ Scrollbar ให้เป็นโทนสว่าง */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </main>
  );
}
