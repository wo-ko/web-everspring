'use client';
import React from 'react'
import './productgroup.css'
import ProductCategory from './product-category';

export default function productgroup() {
    const categories = [
        { icon: '/icons/rain-plants.svg', alt: 'Rain Plants', label: 'สารกำจัดศัตรูพืช' },
        { icon: '/icons/pesticide.svg', alt: 'Pesticide', label: 'สารกำจัดแมลง' },
        { icon: '/icons/shield-leaf.svg', alt: 'Shield Leaf', label: 'สารป้องกันกำจัดโรคพืช' },
        { icon: '/icons/sprayer-plants.svg', alt: 'Sprayer Plants', label: 'สารกำจัดวัชพืช' },
        { icon: '/icons/water-drop-leaf.svg', alt: 'Water Drop Leaf', label: 'ปุ๋ยน้ำและอาหารเสริมพืช' },
        { icon: '/icons/bottles.svg', alt: 'Bottles', label: 'สารเพิ่มประสิทธิภาพ' },
    ];
    return (
        <div className={'container-product-group'}>
            <title>Our Products</title>
            <link rel="icon" href="/favicon.ico" />
            <main className={'main-product-group'}>
                <h1 className={'title-product-group'}>
                    ผลิตภัณฑ์
                </h1>

                <div className={'category-grid-product-group'}>
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
    )
}
