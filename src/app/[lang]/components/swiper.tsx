'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function SwiperComponent() {
  const slides = [
    { text: 'Slide 1', image: 'https://images2.alphacoders.com/139/thumb-1920-1396560.jpg', link: 'https://www.youtube.com/' },
    { text: 'Slide 2', image: 'https://images.alphacoders.com/139/thumb-1920-1396558.jpg', link: 'https://swiperjs.com/' },
    { text: 'Slide 3', image: 'https://images.alphacoders.com/139/thumb-1920-1396559.jpg', link: 'https://github.com/' },
  ];

  return (
    // คอนเทนเนอร์หลักของ Swiper: กำหนดความกว้างและความสูง
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      // navigation={true} // คอมเมนต์ไว้เนื่องจาก navigation ไม่ได้ถูกใช้งาน
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-1/2" // Original .container-swiper
    >
      {slides.map((slide, index) => (
        // SwiperSlide แต่ละอัน: จัดกึ่งกลางข้อความ, ขนาดตัวอักษร, พื้นหลัง, และการจัดเรียง Flexbox
        <SwiperSlide key={index} className="text-center text-lg bg-gray-700 flex justify-center items-center"> {/* Original .container-swiper-slide */}
          <Link href={slide.link} target="_blank">
            {/* รูปภาพในสไลด์: แสดงเป็น block, เต็มความกว้าง/สูง, และ object-fit cover */}
            <img
              src={slide.image}
              alt={slide.text}
              className="block w-full h-full object-cover" // Original .container-swiper-image
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;
