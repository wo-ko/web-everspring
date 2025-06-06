'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper.css'; 
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
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="container-swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="container-swiper-slide ">
          <Link href={slide.link} target="_blank">
            <img
              src={slide.image}
              alt={slide.text}
              className="container-swiper-image "
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;
