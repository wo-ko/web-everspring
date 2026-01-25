// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import Image from "next/image";

// type Slide = {
//   image?: string;
//   link: string;
// };

// type SwiperProps = {
//   obj: Slide[];
// };

// const ImageSwiper: React.FC<SwiperProps> = ({ obj }) => {
//   return (
//     <div className="relative w-full">
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         pagination={{ clickable: true }}
//         loop={true}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="w-full h-1/2"
//         // className="w-full "
//       >
//         {obj?.length
//           ? obj.map((slide, index) => (
//               <SwiperSlide
//                 key={index}
//                 className="text-center text-lg bg-gray-700 flex justify-center items-center"
//               >
//                 <Link href={slide?.link} target="_blank">
//                   <div className="relative w-full ">
//                     <Image
//                       src={slide?.image || ""}
//                       alt={`Slide ${index + 1}`}
//                       width={1920}
//                       height={1080}
//                       className="object-cover"
//                       unoptimized
//                     />
//                   </div>
//                 </Link>
//               </SwiperSlide>
//             ))
//           : null}
//       </Swiper>
//     </div>
//   );
// };

// export default ImageSwiper;

"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

type Slide = {
  image?: string;
  link: string;
};

type SwiperProps = {
  obj: Slide[];
};

const ImageSwiper: React.FC<SwiperProps> = ({ obj }) => {
  if (!obj || obj.length === 0) return null;

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {obj.map((slide, index) => {
          const src = renderImageUrl(slide.image);
          if (!src) return null;

          return (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <Link href={slide.link} target="_blank" className="w-full">
                <div className="relative w-full">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                    unoptimized
                    priority={index === 0}
                  />
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
