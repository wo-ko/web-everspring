"use client";
import React, { useState } from "react";
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
  categories?: Category[]; // optional
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

const FALLBACK_IMAGES = [
  "/fallback/icon-01.png",
  "/fallback/icon-02.png",
  "/fallback/icon-03.png",
  "/fallback/icon-04.png",
  "/fallback/icon-05.png",
  "/fallback/icon-06.png",
];

/* ================= COMPONENT ================= */

const GroupProduct: React.FC<GroupProductProps> = ({
  categories = [],
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
            categories.map((category, index) => {
              const [imgError, setImgError] = useState(false);

              const fallbackImage =
                FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

              const imageSrc =
                !imgError && category.productCategoryImgUrl
                  ? category.productCategoryImgUrl
                  : fallbackImage;

              return (
                <Link
                  key={category.productCategoryId}
                  href={getLinkForCategory(category.productCategoryName.en)}
                >
                  <div className="flex flex-col items-center text-center w-[150px] cursor-pointer group">
                    <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4 border-2 border-transparent hover:scale-105">
                      <Image
                        src={imageSrc}
                        alt={category.productCategoryName[currentLang]}
                        width={200}
                        height={200}
                        className="object-contain"
                        unoptimized
                        onError={() => setImgError(true)}
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
              );
            })
          ) : (
            <p>No product categories found.</p>
          )}
        </div>
      </main>
    </div>
  );
};
export default GroupProduct;
