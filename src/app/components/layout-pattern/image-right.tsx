// "use client";
// import React from "react";
// import Image from "next/image";
// type ImageRightTextBlockProps = {
//   obj: {
//     image: string;
//     title?: string;
//     text: string;
//   }[];
// };

// export default function ImageRightTextBlock({ obj }: ImageRightTextBlockProps) {
//   if (!obj || obj.length === 0) return null;

//   const { image, title, text } = obj[0];

//   return (
//     <section className="py-16 md:py-2">
//       <div className="flex flex-col md:flex-row-reverse items-center gap-10 max-w-6xl mx-auto px-6">
//         {/* รูปภาพด้านขวา */}
//         <div className="md:w-1/2 flex justify-center">
//           <Image
//             src={image}
//             alt={title || "image"}
//             className="w-full h-auto object-contain shadow-sm max-w-full"
//             width={800}
//             height={600}
//             unoptimized
//           />
//         </div>
//         {/* ข้อความด้านซ้าย */}
//         <div className="md:w-1/2">
//           {title && (
//             <h2
//               className={`
//     text-[18px]       /* มือถือเล็ก */
//     sm:text-[20px]    /* มือถือใหญ่ / iPhone Pro */
//     md:text-[22px]    /* iPad / Tablet */
//     lg:text-[30px]    /* Desktop ขนาดกลาง */
//     xl:text-[30px]    /* Desktop / Widescreen */
//     font-semibold mb-6 text-gray-900
//   `}
//             >
//               {title}
//             </h2>
//           )}
//           <p
//             className={`
//     text-[14px]       /* มือถือเล็ก */
//     sm:text-[15px]    /* มือถือใหญ่ / iPhone Pro */
//     md:text-[16px]    /* iPad / Tablet */
//     lg:text-[18px]    /* Desktop ขนาดกลาง */
//     xl:text-[20px]    /* Desktop / Widescreen */
//     leading-relaxed
//     text-gray-700
//   `}
//           >
//             {text}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import { renderImageUrl } from "@app/admin/hook/useMediaImages";

type ImageRightTextBlockProps = {
  obj: {
    image?: string;
    title?: string;
    text?: string;
  }[];
};

export default function ImageRightTextBlock({ obj }: ImageRightTextBlockProps) {
  if (!obj || obj.length === 0) return null;

  const { image, title, text } = obj[0];
  const src = renderImageUrl(image);

  if (!src && !title && !text) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 max-w-6xl mx-auto px-6">
        {/* รูปภาพด้านขวา */}
        {src && (
          <div className="md:w-1/2 flex justify-center">
            <Image
              src={src}
              alt={title || "image"}
              className="w-full h-auto object-contain shadow-sm max-w-full"
              width={800}
              height={600}
              unoptimized
            />
          </div>
        )}

        {/* ข้อความด้านซ้าย */}
        <div className="md:w-1/2">
          {title && (
            <h2
              className="
                text-[18px]
                sm:text-[20px]
                md:text-[22px]
                lg:text-[30px]
                xl:text-[30px]
                font-semibold mb-6 text-gray-900
              "
            >
              {title}
            </h2>
          )}

          {text && (
            <p
              className="
                text-[14px]
                sm:text-[15px]
                md:text-[16px]
                lg:text-[18px]
                xl:text-[20px]
                leading-relaxed
                text-gray-700
              "
            >
              {text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
