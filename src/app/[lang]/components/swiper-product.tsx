'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';

function SwiperProduct() {
    const slides = [
        {
            text: 'ฟาร์มเพียว 500 SC',
            content: 'ฟาร์มเพียว 500 SC เป็นสารกำจัดแมลงประสิทธิภาพสูง ที่สามารถควบคุมเพลี้ยไฟ เพลี้ยอ่อน และแมลงหวี่ขาวได้อย่างรวดเร็วและต่อเนื่อง ช่วยลดความเสียหายจากศัตรูพืชได้อย่างมีประสิทธิภาพโดยไม่ทำลายพืช. เหมาะสำหรับใช้ในพืชผัก พืชไร่ และไม้ผลที่ต้องการความสะอาดและปลอดแมลงรบกวน.',
            image: 'https://images2.alphacoders.com/139/thumb-1920-1396560.jpg', link: 'https://www.youtube.com/'
        },
        {
            text: 'ซูเปอร์ราก 10-60-10+TE',
            content: 'สูตรปุ๋ยเข้มข้นพิเศษที่ช่วยเร่งการแตกราก กระตุ้นการสะสมอาหารและการออกดอกอย่างมีประสิทธิภาพ ช่วยให้พืชตั้งตัวได้เร็วหลังปลูกหรือตัดแต่ง และส่งเสริมคุณภาพผลผลิตให้สม่ำเสมอ. มีธาตุอาหารเสริมครบถ้วน ช่วยเสริมความแข็งแรงให้พืชโดยรวม.',
            image: 'https://images.alphacoders.com/139/thumb-1920-1396558.jpg', link: 'https://swiperjs.com/'
        },
        {
            text: 'บลูไบโอ 3 in 1',
            content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
            image: 'https://images.alphacoders.com/139/thumb-1920-1396559.jpg', link: 'https://github.com/'
        },
        {
            text: 'บลูไบโอ 3 in 1',
            content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
            image: 'https://images.alphacoders.com/681/thumbbig-681662.webp', link: 'https://github.com/'
        },
        {
            text: 'บลูไบโอ 3 in 1',
            content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
            image: 'https://images.alphacoders.com/631/thumbbig-631389.webp', link: 'https://github.com/'
        },
    ];

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            centeredSlides={true}
            freeMode={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            // navigation={true}
            modules={[Autoplay, Pagination, FreeMode]}
            className="container-swiper-product"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className="container-swiper-slide-product">
                    <Link href={slide.link} target="_blank">
                        <img
                            src={slide.image}
                            alt={slide.text}
                            className="container-swiper-product-image"
                        />
                    </Link>
                    <h1>{slide.text}</h1>
                    <p>{slide.content}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SwiperProduct;
