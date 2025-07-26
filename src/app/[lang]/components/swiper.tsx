'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

type Slide = {
  text: string;
  image: string;
  link: string;
};

type SwiperProps = {
  slides: Slide[];
};
const SwiperComponent: React.FC<SwiperProps> = ({ slides }) => {

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      // navigation={true} // คอมเมนต์ไว้เนื่องจาก navigation ไม่ได้ถูกใช้งาน
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-1/2"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} 
        className="text-center text-lg bg-gray-700 flex justify-center items-center"
        >
          <Link href={slide.link} target="_blank">
            {/* <Image
              src={slide.image}
              alt={slide.text}
              className="block w-full h-full object-cover"
            /> */}
            <div className="relative w-full">
              <img
                src={slide.image}
                alt={slide.text}
                className="object-cover"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;