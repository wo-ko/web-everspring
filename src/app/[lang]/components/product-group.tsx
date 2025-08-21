'use client';
import React from 'react'
import ProductCategory from './product-category';
import { useThemeContext } from '@app/context/theme-context';
type Categories = {
  icon: string;
  alt: string;
  label: string;
};

type categoriesProps = {
  categories: Categories[];
  text:string;
};
 const ProductGroup: React.FC<categoriesProps> = ({ categories,text }) =>{
    const { themeColor1 } = useThemeContext();
   
    return (
    <div 
    // className="min-h-screen px-2 flex flex-col justify-center items-center"
    >
      <main className="py-5 flex flex-1 flex-col justify-center items-center w-full">
        <h1 className="mb-10 text-4xl font-bold" style={{ color: themeColor1 || '#388e3c' }}>
          {text}
        </h1>
        <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl w-full">
          {categories.map((category, index) => (
            <ProductCategory
              key={index}
              iconSrc={category.icon}
              altText={category.alt}
              label={category.label}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductGroup;