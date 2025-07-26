"use client";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";
import Swiper from "./components/swiper";
import SideImageLayout from "./components/side-Image-layout";
import ProductGroup from "./components/product-group";
import SwiperProduct from "./components/swiper-product";
// import Footer from './components/foo-ter';
import StackedImagesLayout from './components/stacked-images-layout';
import ImageBanner from './components/image-banner';
import PatternComponents from '@app/components/pattern-components';
export default function LangPage() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

const slides = [
  { text: 'Slide 1', image: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470655/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81-01_qqv7dz.jpg', link: 'https://www.youtube.com/' },
  { text: 'Slide 2', image: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470662/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81-02_cf5oif.jpg', link: 'https://swiperjs.com/' },
  { text: 'Slide 3', image: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752471086/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81-03.jpg', link: 'https://github.com/' },
];

 const categories = [
        { icon: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470648/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-03_tg6tmj.png', alt: '', label: 'สารกำจัดวัชพืช' },
        { icon: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470648/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-02_gk3bqq.png', alt: '', label: 'สารกำจัดแมลง' },
        { icon: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470645/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-01_zruadd.png', alt: '', label: 'สารป้องกันกำจัดโรคพืช' },
        { icon: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470646/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-06_xkicnc.png', alt: '', label: 'สารควบคุมการออกดอก' },
        { icon: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470642/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-04_jymtti.png', alt: '', label: 'สารกำจัดไรศัตรูพืช' },
        { icon: 'https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470643/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99-05_zby8ir.png', alt: '', label: 'สารควบคุมหอย' },
    ];
    

  return (
    <>
    <PatternComponents pageName="home"/>
      {/* <Swiper slides={slides}/>
      <SideImageLayout
        imageSrc="https://lh3.googleusercontent.com/proxy/m-VEe3aIeFdjGFGgfviEdDNa9tLkjhRyyccb2lOjC5HDoVaQo2X09Va9xWNt-ftRpF0Kf_39vjAhm3eOpobN9Xx7nN0Vig"
        title="บริษัท เอเวอร์สปริง อโกรเคม จำกัด"
        content='มีความมุ่งมั่นที่จะเป็นบริษัทที่มี<br>\nระบบการบริหารคุณภาพตามมาตรฐานสากลเพื่อให้สินค้า
สารป้องกันกำจัดศัตรูพืชและธาตุอาหารพืช ที่บริษัทผลิตและจำหน่าย มีคุณภาพตรงตามความต้องการของลูกค้า 
โดยทั้งนี้บริษัทมุ่งเน้นให้ผลิตภัณฑ์ของบริษัทสามารถตอบสนองต่อความพึงพอใจของลูกค้าและมีการปรับปรุงระบบการทำงานของบริษัทให้มีการพัฒนาอย่างต่อเนื่อง'
        reverse={true}
        imageWidth="w-64"
        imageHeight="h-64"
      />
       <ImageBanner
        src="https://res.cloudinary.com/dyg6r8pec/image/upload/v1749193868/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-02_0_pqqbgi.jpg" 
        alt="-" 
      />
      <ProductGroup categories={categories}/>  */}
       {/* <SwiperProduct/> */}
    {/* <ImageBanner
        src="https://res.cloudinary.com/dyg6r8pec/image/upload/v1752470657/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81-04_avyx7j.jpg" 
        alt="โกดังสินค้าของบริษัท" 
      />
      <StackedImagesLayout
              title="บริษัทในเครือ"
              content=""
              images={[
                "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749102107/LINE_ALBUM_Ever_spring_250604_4-removebg-preview_ryv5np.png",
                "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749102107/LINE_ALBUM_Ever_spring_250604_3-removebg-preview_zgquer.png",
                "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749102107/LINE_ALBUM_Ever_spring_250604_5-removebg-preview_wbb6gc.png",
              ]}
              imageSize="w-30 h-24"
              imageGapX="gap-x-10"
              imageGapY="gap-y-10"
              titleColor={themeColor1}
              imagePosition="middle"
            />  */}
    </>
  );
}
