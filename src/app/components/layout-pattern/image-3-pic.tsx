// "use client";
// import React from "react";
// import Image from "next/image";
// type ImagePicProps = {
//   obj?: { image: string }[]; // ต้องการ 3 รูป: ซ้าย 2 + ขวา 1
// };

// export default function Image3Pic({ obj }: ImagePicProps) {
//   if (!obj || obj.length < 3) return null;

//   const [leftTop, leftBottom, right] = obj;

//   return (
//     <div className="relative flex flex-col md:flex-row justify-center items-start gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-16 max-w-6xl mx-auto">
//       <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 opacity-30 transform -translate-x-1"></div>{" "}
//       {/* ซ้าย: 2 รูปแนวตั้ง */}
//       <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-2">
//         {[leftTop, leftBottom].map((item, idx) => (
//           <div
//             key={idx}
//             className="relative w-full sm:max-w-[250px] md:max-w-[450px] mx-auto aspect-[4/3] transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
//           >
//             <Image
//               src={item.image}
//               alt={`left-${idx}`}
//               fill
//               className="object-contain"
//               unoptimized
//             />
//           </div>
//         ))}
//       </div>
//       {/* ขวา: 1 รูปใหญ่ */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         <div className="relative w-full sm:max-w-[430px] md:max-w-none transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50">
//           <Image
//             src={right.image}
//             alt="right"
//             width={600}
//             height={200}
//             className="object-contain w-full h-auto"
//             unoptimized
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

type ImagePicProps = {
  obj?: { image?: string }[];
};

export default function Image3Pic({ obj = [] }: ImagePicProps) {
  const leftTop = renderImageUrl(obj[0]?.image);
  const leftBottom = renderImageUrl(obj[1]?.image);
  const right = renderImageUrl(obj[2]?.image);

  // ถ้าไม่มีรูปเลย ไม่ต้อง render
  if (!leftTop && !leftBottom && !right) return null;

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-start gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 my-8 sm:my-10 md:my-16 max-w-6xl mx-auto">
      {/* เส้นกลาง */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 opacity-30 transform -translate-x-1" />

      {/* ซ้าย: 2 รูป */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-2">
        {[leftTop, leftBottom].map(
          (src, idx) =>
            src && (
              <div
                key={idx}
                className="relative w-full sm:max-w-[250px] md:max-w-[450px] mx-auto aspect-[4/3]
                transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
              >
                <Image
                  src={src}
                  alt={`left-${idx}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ),
        )}
      </div>

      {/* ขวา: 1 รูปใหญ่ */}
      <div className="w-full md:w-1/2 flex justify-center">
        {right && (
          <div
            className="relative w-full sm:max-w-[430px] md:max-w-none
            transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-400/50"
          >
            <Image
              src={right}
              alt="right"
              width={600}
              height={200}
              className="object-contain w-full h-auto"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
