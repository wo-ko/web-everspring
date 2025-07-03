'use client';
import { ThemeContext, useThemeContext } from '@app/context/theme-context';
import { useContext } from "react";
import Swiper from './components/swiper';
import SideImageLayout from './components/side-Image-layout';
import ProductGroup from './components/product-group';
import SwiperProduct from './components/swiper-product';
// import Footer from './components/foo-ter';
import StackedImagesLayout from './components/stacked-images-layout';
import ImageBanner from './components/image-banner';
export default function LangPage() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();

const slides = [
  { text: 'Slide 1', image: '/หน้าหลัก-01.jpg', link: 'https://www.youtube.com/' },
  { text: 'Slide 2', image: '/หน้าหลัก-02.jpg', link: 'https://swiperjs.com/' },
  { text: 'Slide 3', image: '/หน้าหลัก-03.jpg', link: 'https://github.com/' },
];

 const categories = [
        { icon: '/icon-03.png', alt: '', label: 'สารกำจัดศัตรูพืช' },
        { icon: '/icon-02.png', alt: '', label: 'สารกำจัดแมลง' },
        { icon: '/icon-01.png', alt: '', label: 'สารป้องกันกำจัดโรคพืช' },
        { icon: '/icon-06.png', alt: '', label: 'สารควบคุมการออกดอก' },
        { icon: '/icon-04.png', alt: '', label: 'สารกำจัดไรศัตรูพืช' },
        { icon: '/icon-05.png', alt: '', label: 'สารควบคุมหอย' },
    ];
    

  return (
    <>
      <Swiper slides={slides}/>
      <SideImageLayout
        imageSrc="https://lh3.googleusercontent.com/proxy/m-VEe3aIeFdjGFGgfviEdDNa9tLkjhRyyccb2lOjC5HDoVaQo2X09Va9xWNt-ftRpF0Kf_39vjAhm3eOpobN9Xx7nN0Vig"
        title="บริษัท เอเวอร์สปริง อโกรเคม จำกัด"
        content="มีความมุ่งมั่นที่จะเป็นบริษัทที่มีระบบการบริหารคุณภาพตามมาตรฐานสากลเพื่อให้สินค้า
สารป้องกันกำจัดศัตรูพืชและธาตุอาหารพืช ที่บริษัทผลิตและจำหน่าย มีคุณภาพตรงตามความต้องการของลูกค้า 
โดยทั้งนี้บริษัทมุ่งเน้นให้ผลิตภัณฑ์ของบริษัทสามารถตอบสนองต่อความพึงพอใจของลูกค้าและมีการปรับปรุงระบบการทำงานของบริษัทให้มีการพัฒนาอย่างต่อเนื่อง"
        reverse={true}
        imageWidth="w-64"
        imageHeight="h-64"

      />
       <ImageBanner
        src="https://images.alphacoders.com/133/thumb-1920-1336951.png" 
        alt="-" 
      />
      <ProductGroup categories={categories}/>
      {/* <SwiperProduct/> */}
      <ImageBanner
        src="https://images3.alphacoders.com/135/thumb-1920-1350069.jpeg" 
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
            />
      {/* <Footer/> */}
      {/* <p className="mt-4 text-center text-white">{lang}</p> */}
    </>
  );
}
