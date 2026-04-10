"use client";
import Link from "next/link";
import { useThemeContext } from "@app/context/theme-context";
import Image from "next/image";
import { resolveImageUrl } from "@app/admin/hook/useMediaImages";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Category = {
  productCategoryId: number;
  productCategoryImgUrl: string | null;
  productCategoryName: {
    en: string;
    th: string;
  };
};

type GroupProductProps = {
  categories?: Category[]; // optional
  text?: string;
};

const fallbackMap: Record<string, string> = {
  Herbicide: "/fallback/icon-01.png",
  Insecticide: "/fallback/icon-02.png",
  Fungicide: "/fallback/icon-03.png",
  "Plant Growth Regulators": "/fallback/icon-04.png",
  Acaricide: "/fallback/icon-05.png",
  Molluscicide: "/fallback/icon-06.png",
};

const getLinkForCategory = (enName: string, lang: string): string => {
  const slugMap: { [key: string]: string } = {
    Herbicide: `/${lang}/product/herbicide`,
    Insecticide: `/${lang}/product/insecticide`,
    Fungicide: `/${lang}/product/fungicide`,
    "Plant Growth Regulators": `/${lang}/product/plant`,
    Acaricide: `/${lang}/product/acaricide`,
    Molluscicide: `/${lang}/product/mollus`,
  };
  return slugMap[enName] || `/${lang}/product`;
};

// const CategoryItem = ({ category, currentLang, themeColor1 }: any) => {
//   const rawUrl = category.productCategoryImgUrl?.trim();
//   const data = resolveImageUrl(rawUrl);
//   const finalImageUrl = rawUrl
//     ? `${API_URL || ""}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`
//     : null;

//   return (
//     <Link
//       href={getLinkForCategory(category.productCategoryName.en, currentLang)}
//     >
//       <div className="flex flex-col items-center text-center w-[150px] cursor-pointer group">
//         <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4 border-2 border-transparent hover:scale-105 transition-transform overflow-hidden">
//           {finalImageUrl ? (
//             <Image
//               src={data}
//               alt={category.productCategoryName[currentLang]}
//               width={200}
//               height={200}
//               className="object-contain"
//               unoptimized
//             />
//           ) : (
//             <span className="text-xs text-gray-400">No Image</span>
//           )}
//         </div>
//         <p
//           className="font-semibold"
//           style={{ color: themeColor1 || "#323296" }}
//         >
//           {category.productCategoryName[currentLang]}
//         </p>
//       </div>
//     </Link>
//   );
// };

const CategoryItem = ({ category, currentLang, themeColor1 }: any) => {
  const rawUrl = category.productCategoryImgUrl?.trim();

  const fallbackImage = fallbackMap[category.productCategoryName.en];
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";
    
  const imgSrc = rawUrl
    ? resolveImageUrl(
        `${API_URL || ""}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`,
      )
    : fallbackImage;

  return (
    <Link
      href={getLinkForCategory(category.productCategoryName.en, currentLang)}
    >
      <div className="flex flex-col items-center text-center w-[150px] cursor-pointer group">
        <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4 border-2 border-transparent hover:scale-105 transition-transform overflow-hidden">
          <Image
            src={imgSrc}
            alt={category.productCategoryName[currentLang]}
            width={200}
            height={200}
            className="object-contain"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackImage;
            }}
          />
        </div>

        <p
          className="font-semibold"
          // style={{ color: themeColor1 || "#323296" }}
          style={{ color: displayColor }}
        >
          {category.productCategoryName[currentLang]}
        </p>
      </div>
    </Link>
  );
};

const GroupProduct: React.FC<GroupProductProps> = ({
  categories = [],
  text,
}) => {
  const { themeColor1, lang } = useThemeContext();
  const currentLang: "th" | "en" = lang === "en" || lang === "th" ? lang : "th";
  const displayColor =
    themeColor1 === "#D9D9D9" ? "#666666" : themeColor1 || "#323296";

  return (
    <div>
      <main className="py-5 flex flex-1 flex-col justify-center items-center w-full">
        {text && (
          <Link href={`/${currentLang}/product`}>
            <h1
              className="mb-10 text-4xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
              // style={{ color: themeColor1 || "#323296" }}
              style={{ color: displayColor }}
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
            categories.map((category, index) => (
              <CategoryItem
                key={category.productCategoryId}
                category={category}
                index={index}
                currentLang={currentLang}
                themeColor1={themeColor1}
              />
            ))
          ) : (
            <p className="text-gray-500">No product categories found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupProduct;
