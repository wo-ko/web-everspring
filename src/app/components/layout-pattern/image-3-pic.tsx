// "use client";
// import React from "react";
// import Image from "next/image";
// import { renderImageUrl } from "@app/admin/hook/useMediaImages";

// type ImagePicProps = {
//   obj?: { image?: string }[];
// };

// export default function Image3Pic({ obj = [] }: ImagePicProps) {
//   const leftTop = renderImageUrl(obj[0]?.image);
//   const leftBottom = renderImageUrl(obj[1]?.image);
//   const right = renderImageUrl(obj[2]?.image);

//   // ถ้าไม่มีรูปเลย ไม่ต้อง render
//   if (!leftTop && !leftBottom && !right) return null;

//   return (
//     <div className="relative flex flex-col md:flex-row justify-center items-start gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-16 max-w-6xl mx-auto">
//       {/* เส้นกลาง */}
//       <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 opacity-30 transform -translate-x-1" />

//       {/* ซ้าย: 2 รูป */}
//       <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-2">
//         {[leftTop, leftBottom].map(
//           (src, idx) =>
//             src && (
//               <div
//                 key={idx}
//                 className="relative w-full sm:max-w-[250px] md:max-w-[450px] mx-auto aspect-[4/3]
//                 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
//               >
//                 <Image
//                   src={src}
//                   alt={`left-${idx}`}
//                   fill
//                   className="object-contain"
//                   unoptimized
//                 />
//               </div>
//             ),
//         )}
//       </div>

//       {/* ขวา: 1 รูปใหญ่ */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         {right && (
//           <div
//             className="relative w-full sm:max-w-[430px] md:max-w-none
//             transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
//           >
//             <Image
//               src={right}
//               alt="right"
//               width={600}
//               height={200}
//               className="object-contain w-full h-auto"
//               unoptimized
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import React from "react";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

export default function Image3Pic({
  obj = [],
}: {
  obj?: { image?: string }[];
}) {
  const images: string[] = [
    renderImageUrl(obj[0]?.image),
    renderImageUrl(obj[1]?.image),
    renderImageUrl(obj[2]?.image),
  ].filter((src): src is string => Boolean(src));

  if (images.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {" "}
      {/* ลด py ลง */}
      <div className="grid grid-cols-2 gap-4">
        {/* ซ้าย 2 */}
        <div className="flex flex-col gap-4">
          {images.slice(0, 2).map((src, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 shadow-sm"
            >
              <Image
                src={src}
                alt="left"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                unoptimized
              />
            </div>
          ))}
        </div>
        {/* ขวา 1 */}
        <div className="relative w-full h-full overflow-hidden bg-gray-100 shadow-sm min-h-[300px]">
          {images[2] && (
            <Image
              src={images[2]}
              alt="right"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              unoptimized
            />
          )}
        </div>
      </div>
    </div>
  );
}
