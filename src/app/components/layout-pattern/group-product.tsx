// "use client";
// import React from "react";
// import Link from "next/link";
// import { useThemeContext } from "@app/context/theme-context";
// import Image from "next/image";
// type Category = {
//   productCategoryId: number;
//   productCategoryImgUrl: string;
//   productCategoryName: {
//     en: string;
//     th: string;
//   };
// };

// type GroupProductProps = {
//   categories: Category[];
//   text?: string;
// };

// const getLinkForCategory = (enName: string): string => {
//   const slugMap: { [key: string]: string } = {
//     Herbicide: "/th/product/herbicide",
//     Insecticide: "/th/product/insecticide",
//     Fungicide: "/th/product/fungicide",
//     "Plant Growth Regulators": "/th/product/plant",
//     Acaricide: "/th/product/acaricide",
//     Molluscicide: "/th/product/mollus",
//   };
//   return slugMap[enName] || "/th/product";
// };

// const GroupProduct: React.FC<GroupProductProps> = ({ categories, text }) => {
//   const { themeColor1, lang } = useThemeContext();
//   const currentLang =
//     lang as keyof (typeof categories)[0]["productCategoryName"];
//   //    const uniqueCategories = categories.filter((category, index, self) =>
//   //     index === self.findIndex((c) =>
//   //         c.productCategoryName.en === category.productCategoryName.en
//   //     )
//   // );
//   return (
//     <div>
//       <main className="py-5 flex flex-1 flex-col justify-center items-center w-full">
//         <Link href="/th/product">
//           <h1
//             className="mb-10 text-4xl font-bold cursor-pointer"
//             style={{ color: themeColor1 || "#323296" }}
//           >
//             {text}
//           </h1>
//         </Link>
//         {/* <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl w-full px-4"> */}
//         <div
//           className={`
//     flex flex-wrap justify-center
//     gap-2 sm:gap-4 md:gap-4
//     w-full
//     px-2 sm:px-4 md:px-4 lg:px-6
//     max-w-[1500px]        /* มือถือเล็ก */
//     sm:max-w-[1500px]     /* มือถือใหญ่ / iPhone Pro */
//     md:max-w-[700px]     /* iPad / tablet พอดีไม่ห่อบรรทัด */
//     lg:max-w-[]    /* Desktop ขนาดกลาง */
//     xl:max-w-screen-xl   /* Desktop / widescreen PC */
//   `}
//         >
//           {categories.length ? (
//             categories.map((category, index) => (
//               <Link
//                 key={index}
//                 href={getLinkForCategory(category.productCategoryName.en)}
//                 passHref
//               >
//                 <div className="flex flex-col items-center text-center w-[150px] cursor-pointer group ">
//                   <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4  border-2 border-transparent hover:scale-105">
//                     {/* <Image
//                       src={category.productCategoryImgUrl}
//                       alt={category.productCategoryName[currentLang]}
//                       className="w-[95%] h-[95%] hover:w-[100%] hover:h-[100%] object-contain"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           "https://placehold.co/84x84/e0e0e0/757575?text=Image";
//                       }}
//                     /> */}
//                     <Image
//                       src={category.productCategoryImgUrl}
//                       alt="logo"
//                       width={200}
//                       height={200}
//                       className="object-contain"
//                       onError={(e) => {
//                         e.currentTarget.src =
//                           "https://placehold.co/84x84/e0e0e0/757575?text=Image";
//                       }}
//                       unoptimized
//                     />

//                   </div>
//                   <p
//                     className="font-semibold hover:from-neutral-800"
//                     style={{ color: themeColor1 || "#323296" }}
//                   >
//                     {category.productCategoryName[currentLang]}
//                   </p>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p>No product categories found.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default GroupProduct;

"use client";
import React from "react";
import Link from "next/link";
import { useThemeContext } from "@app/context/theme-context";
import Image from "next/image";

/* ================= TYPES ================= */

type Category = {
  productCategoryId: number;
  productCategoryImgUrl: string;
  productCategoryName: {
    en: string;
    th: string;
  };
};

type GroupProductProps = {
  categories?: Category[]; // ✅ optional
  text?: string;
};

/* ================= HELPERS ================= */

const getLinkForCategory = (enName: string): string => {
  const slugMap: { [key: string]: string } = {
    Herbicide: "/th/product/herbicide",
    Insecticide: "/th/product/insecticide",
    Fungicide: "/th/product/fungicide",
    "Plant Growth Regulators": "/th/product/plant",
    Acaricide: "/th/product/acaricide",
    Molluscicide: "/th/product/mollus",
  };
  return slugMap[enName] || "/th/product";
};

/* ================= COMPONENT ================= */

const GroupProduct: React.FC<GroupProductProps> = ({
  categories = [], // ✅ default value
  text,
}) => {
  const { themeColor1, lang } = useThemeContext();

  const currentLang: "th" | "en" = lang === "en" || lang === "th" ? lang : "th";

  return (
    <div>
      <main className="py-5 flex flex-1 flex-col justify-center items-center w-full">
        {text && (
          <Link href="/th/product">
            <h1
              className="mb-10 text-4xl font-bold cursor-pointer"
              style={{ color: themeColor1 || "#323296" }}
            >
              {text}
            </h1>
          </Link>
        )}

        <div
          className="
            flex flex-wrap justify-center
            gap-2 sm:gap-4 md:gap-4
            w-full
            px-2 sm:px-4 md:px-4 lg:px-6
            max-w-[1500px]
            md:max-w-[700px]
            xl:max-w-screen-xl
          "
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.productCategoryId}
                href={getLinkForCategory(category.productCategoryName.en)}
              >
                <div className="flex flex-col items-center text-center w-[150px] cursor-pointer group">
                  <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4 border-2 border-transparent hover:scale-105">
                    <Image
                      src={category.productCategoryImgUrl}
                      alt={category.productCategoryName[currentLang]}
                      width={200}
                      height={200}
                      className="object-contain"
                      unoptimized
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://placehold.co/84x84/e0e0e0/757575?text=Image";
                      }}
                    />
                  </div>

                  <p
                    className="font-semibold"
                    style={{ color: themeColor1 || "#323296" }}
                  >
                    {category.productCategoryName[currentLang]}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No product categories found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupProduct;
