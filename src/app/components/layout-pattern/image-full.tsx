// "use client";
// import React from "react";
// import Image from "next/image";
// import { renderImageUrl } from "@app/admin/hook/useMediaImages";

// export default function ImageFull(props: { image?: string }) {
//   const src = renderImageUrl(props.image);
//   if (!src) return null;

//   return (
//     <div className="w-full flex justify-center my-8 sm:my-10 md:my-12 px-4 sm:px-6 md:px-8">
//       <Image
//         src={src}
//         alt=""
//         className="w-full max-w-6xl h-auto object-contain"
//         priority
//         width={1920}
//         height={1080}
//         unoptimized
//       />
//     </div>
//   );
// }

"use client";
import React from "react";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

export default function ImageFull(props: { image?: string }) {
  const src = renderImageUrl(props.image);
  if (!src) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {" "}
      {/* ลด py ลง */}
      <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-gray-100 shadow-sm">
        <Image
          src={src}
          alt="full-width"
          fill
          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
