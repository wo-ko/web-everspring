'use client';
import React from 'react';
import Link from 'next/link'; 
import { useThemeContext } from '@app/context/theme-context';

type Category = {
    productCategoryId: number;
    productCategoryImgUrl: string;
    productCategoryName: {
        en: string;
        th: string;
    };
};

type GroupProductProps = {
    categories: Category[];
};
const getLinkForCategory = (enName: string): string => {
    const slugMap: { [key: string]: string } = {
        "Herbicide": "/th/product/herbicide",
        "Insecticide": "/th/product/insecticide",
        "Fungicide": "/th/product/fungicide",
        "Plant Growth Regulators": "/th/product/plant",
        "Acaricide": "/th/product/acaricide",
        "Molluscicide": "/th/product/mollus",
    };
    return slugMap[enName] || '/th/product';
};

const GroupProduct: React.FC<GroupProductProps> = ({ categories }) => {
    // console.log("Raw categories:", categories);
    const { themeColor1, lang } = useThemeContext();
    const currentLang = lang as keyof typeof categories[0]['productCategoryName'];
//    const uniqueCategories = categories.filter((category, index, self) =>
//     index === self.findIndex((c) =>
//         c.productCategoryName.en === category.productCategoryName.en
//     )
// );
    return (
        <div>             
            <main className="py-5 flex flex-1 flex-col justify-center items-center w-full">                
                <Link href="/th/product">
                    <h1 className="mb-10 text-4xl font-bold cursor-pointer" style={{ color: themeColor1 || '#388e3c' }}>
                        ผลิตภัณฑ์
                    </h1>
                </Link>
                <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl w-full px-4">
                    {categories.length ? categories.map((category, index) => (
                        <Link key={index} href={getLinkForCategory(category.productCategoryName.en)} passHref>
                            <div className="flex flex-col items-center text-center w-[150px] cursor-pointer group">
                                <div 
                                className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4  border-2 border-transparent"
                                >
                                    <img
                                        src={category.productCategoryImgUrl}
                                        alt={category.productCategoryName[currentLang]}
                                        className="w-[95%] h-[95%] hover:w-[100%] hover:h-[100%] object-contain"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://placehold.co/84x84/e0e0e0/757575?text=Image';
                                        }}
                                    />
                                </div>
                                <p className="font-semibold hover:from-neutral-800" style={{ color: themeColor1 || '#388e3c' }}>
                                    {category.productCategoryName[currentLang]}
                                </p>
                            </div>
                        </Link>
                    )) : (
                        <p>No product categories found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default GroupProduct;


