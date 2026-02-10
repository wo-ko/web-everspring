"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { resolveImageUrl } from "@app/admin/hook/useMediaImages";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  startIndex: number;
  title?: string;
};

export default function ImageViewerModal({
  open,
  onClose,
  images,
  startIndex,
  title,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl z-10"
      >
        ✕
      </button>

      {title && (
        <div className="absolute top-4 left-4 text-white z-10">{title}</div>
      )}

      <Swiper
        modules={[Navigation]}
        navigation
        initialSlide={startIndex}
        className="w-full max-w-6xl"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-screen flex items-center justify-center">
              <img
                src={resolveImageUrl(img)}
                alt=""
                className="max-w-full max-h-full object-contain bg-black"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
