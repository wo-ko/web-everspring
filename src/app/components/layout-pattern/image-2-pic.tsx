// "use client";

// import React from "react";
// import Image from "next/image";
// import { renderImageUrl } from "@app/admin/hook/useMediaImages";

// type ImagePicProps = {
//   obj?: { image?: string }[];
// };

// export default function Image2Pic({ obj }: ImagePicProps) {
//   if (!obj || obj.length === 0) return null;

//   return (
//     <div className="flex flex-wrap justify-center gap-2 px-2 sm:px-4 md:px-6 my-6 sm:my-8 md:my-10 max-w-7xl mx-auto">
//       {obj.map((item, i) => {
//         const src = renderImageUrl(item.image);
//         if (!src) return null;

//         return (
//           <div
//             key={i}
//             className="relative w-[46.5%] aspect-[4/3] transition-transform duration-300"
//           >
//             <Image
//               src={src}
//               alt={`image-${i}`}
//               width={600}
//               height={450}
//               className="object-contain"
//               unoptimized
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
"use client";
import React from "react";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

export default function Image2Pic({
  obj = [],
}: {
  obj?: { image?: string }[];
}) {
  const images: string[] = obj
    .map((item) => renderImageUrl(item.image))
    .filter((src): src is string => Boolean(src));

  if (images.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {" "}
      {/* ลด py ลง */}
      <div className="grid grid-cols-2 gap-4">
        {" "}
        {/* ใช้ col-2 เสมอเพื่อให้ขนาดเท่ากัน */}
        {images.slice(0, 2).map((src, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 shadow-sm"
          >
            <Image
              src={src}
              alt={`gallery-${idx}`}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
