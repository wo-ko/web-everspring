'use client';
import React from 'react'
import ProductCategory from './product-category';
import { useThemeContext } from '@app/context/theme-context';

export default function productgroup() {
    const { themeColor1 } = useThemeContext();
    const categories = [
        { icon: '/icons/rain-plants.svg', alt: 'Rain Plants', label: 'สารกำจัดศัตรูพืช' },
        { icon: '/icons/pesticide.svg', alt: 'Pesticide', label: 'สารกำจัดแมลง' },
        { icon: '/icons/shield-leaf.svg', alt: 'Shield Leaf', label: 'สารป้องกันกำจัดโรคพืช' },
        { icon: '/icons/sprayer-plants.svg', alt: 'Sprayer Plants', label: 'สารกำจัดวัชพืช' },
        { icon: '/icons/water-drop-leaf.svg', alt: 'Water Drop Leaf', label: 'ปุ๋ยน้ำและอาหารเสริมพืช' },
        { icon: '/icons/bottles.svg', alt: 'Bottles', label: 'สารเพิ่มประสิทธิภาพ' },
    ];
    return (
    <div 
    // className="min-h-screen px-2 flex flex-col justify-center items-center"
    >
      <main className="py-20 flex flex-1 flex-col justify-center items-center w-full">
        <h1 className="mb-12 text-4xl font-bold" style={{ color: themeColor1 || '#388e3c' }}>
          ผลิตภัณฑ์
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
