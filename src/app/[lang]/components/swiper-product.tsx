'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
// import './swiper.css'; // ไม่ต้องนำเข้าไฟล์ CSS เนื่องจากใช้ Tailwind CSS แล้ว
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation'; // ไม่ได้ใช้ navigation ใน SwiperProduct

import { Autoplay, Pagination, FreeMode } from 'swiper/modules'; // นำเข้า FreeMode แทน Navigation

function SwiperComponent() { // เปลี่ยนชื่อ function เป็น SwiperComponent เพื่อให้สอดคล้องกับ Canvas ID
  const slides = [
    {
      text: 'ฟาร์มเพียว 500 SC',
      content: 'ฟาร์มเพียว 500 SC เป็นสารกำจัดแมลงประสิทธิภาพสูง ที่สามารถควบคุมเพลี้ยไฟ เพลี้ยอ่อน และแมลงหวี่ขาวได้อย่างรวดเร็วและต่อเนื่อง ช่วยลดความเสียหายจากศัตรูพืชได้อย่างมีประสิทธิภาพโดยไม่ทำลายพืช. เหมาะสำหรับใช้ในพืชผัก พืชไร่ และไม้ผลที่ต้องการความสะอาดและปลอดแมลงรบกวน.',
      image: 'https://images2.alphacoders.com/139/thumb-1920-1396560.jpg', link: 'https://www.youtube.com/', statusSwiper: true
    },
    {
      text: 'ซูเปอร์ราก 10-60-10+TE',
      content: 'สูตรปุ๋ยเข้มข้นพิเศษที่ช่วยเร่งการแตกราก กระตุ้นการสะสมอาหารและการออกดอกอย่างมีประสิทธิภาพ ช่วยให้พืชตั้งตัวได้เร็วหลังปลูกหรือตัดแต่ง และส่งเสริมคุณภาพผลผลิตให้สม่ำเสมอ. มีธาตุอาหารเสริมครบถ้วน ช่วยเสริมความแข็งแรงให้พืชโดยรวม.',
      image: 'https://images.alphacoders.com/139/thumb-1920-1396558.jpg', link: 'https://swiperjs.com/', statusSwiper: true
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://images.alphacoders.com/139/thumb-1920-1396559.jpg', link: 'https://github.com/', statusSwiper: true
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://images.alphacoders.com/681/thumbbig-681662.webp', link: 'https://github.com/', statusSwiper: true
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://images.alphacoders.com/631/thumbbig-631389.webp', link: 'https://github.com/', statusSwiper: true
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://images.alphacoders.com/631/thumbbig-631389.webp', link: 'https://github.com/', statusSwiper: false
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://images.alphacoders.com/631/thumbbig-631389.webp', link: 'https://github.com/', statusSwiper: false
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://images.alphacoders.com/631/thumbbig-631389.webp', link: 'https://github.com/', statusSwiper: false
    },
    {
      text: 'บลูไบโอ 3 in 1',
      content: 'เป็นสารกำจัดวัชพืชชนิดเลือกทำลายที่ออกฤทธิ์รวดเร็ว เหมาะสำหรับใช้ในนาข้าวเพื่อควบคุมวัชพืชใบแคบและใบกว้างช่วงต้นฤดูเพาะปลูก. ช่วยลดการแข่งขันระหว่างข้าวกับวัชพืช ส่งเสริมการเจริญเติบโตของต้นข้าวในช่วงแรกได้ดีขึ้น. มีความปลอดภัยต่อข้าวเมื่อใช้ตามอัตราที่แนะนำ.',
      image: 'https://www.centerfoodpack.com/wp-content/uploads/2021/07/op.jpg', link: 'https://github.com/', statusSwiper: true
    },
  ];

  // ฟังก์ชันสำหรับตัดข้อความให้สั้นลง
  const truncateContent = (text: string, maxLength: number) => { // แก้ไข type ของ maxLength เป็น number
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    // คอนเทนเนอร์หลักของ Swiper สำหรับ Product: กำหนดความกว้าง, จัดกึ่งกลาง, padding ด้านล่าง, และตำแหน่ง
    // max-w-6xl คือ 1200px, my-12 คือ margin: 50px auto, pb-12 คือ padding-bottom: 50px
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      centeredSlides={true}
      freeMode={false}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      // navigation={true} // คอมเมนต์ไว้เนื่องจากไม่ได้ใช้ในโค้ด SwiperProduct
      loop={true}
      modules={[Autoplay, Pagination, FreeMode]}
      className="w-full max-w-6xl mx-auto my-12 pb-12 relative" // Original .container-swiper-product
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false,
          freeMode: false,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
          centeredSlides: true,
          freeMode: true,
        },
      }}
    >
      {slides.map((slide, index) => (
        // แสดง SwiperSlide เฉพาะเมื่อ slide.statusSwiper ไม่เป็น false
        slide.statusSwiper === false ? null :
          <SwiperSlide
            key={index}
            // สไตล์เริ่มต้นสำหรับสไลด์ผลิตภัณฑ์: พื้นหลัง, ขอบโค้ง, เงา, การแสดงผล, การเปลี่ยนรูป
            className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden transform scale-95 transition-all duration-300 bg-gray-50 h-auto
                       md:scale-100 md:shadow-md md:bg-white
                       lg:scale-90" // Original .container-swiper-slide-product and media queries
          >
            {/* สไตล์สำหรับสไลด์ที่ Active: เปลี่ยนขนาด, เงา, z-index, พื้นหลัง */}
            {/* Note: Swiper's active state styles are usually applied by Swiper's own CSS,
                       or require custom CSS for specific transforms. This div might not be
                       necessary if Swiper's default CSS handles it. */}
            <div className="swiper-slide-active:scale-100 swiper-slide-active:shadow-xl swiper-slide-active:z-10 swiper-slide-active:bg-white" />
            <Link
              href={slide.link}
              target="_blank"
              className="flex flex-col h-full no-underline text-inherit group" // Original .product-link
            >
              {/* Wrapper รูปภาพ: กำหนดความกว้าง/สูง, overflow, ตำแหน่ง, และเส้นขอบด้านล่าง */}
              <div className="w-full h-52 overflow-hidden relative border-b border-gray-200
                              md:h-44 md:border-r-0 md:border-b md:border-gray-200"> {/* Original .image-wrapper */}
                {/* รูปภาพผลิตภัณฑ์: กำหนดความกว้าง/สูง, object-fit, ตำแหน่ง, และ transition สำหรับ hover */}
                <img
                  src={slide.image}
                  alt={slide.text}
                  className="w-full h-full object-cover object-center block transition-transform duration-300
                             group-hover:scale-105" // Original .container-swiper-product-image and :hover effect
                />
              </div>
              {/* กล่องข้อมูลผลิตภัณฑ์: padding, การแสดงผล, และการจัดเรียง Flexbox */}
              <div className="p-4 flex flex-col flex-grow justify-between
                              md:p-4 md:flex md:flex-col md:overflow-hidden md:whitespace-normal md:overflow-x-hidden md:h-auto md:w-auto md:justify-between md:items-start md:gap-0"> {/* Original .product-info-box and media queries */}
                {/* หัวข้อผลิตภัณฑ์: ขนาดตัวอักษร, น้ำหนัก, สี, margin-bottom */}
                <h1 className="text-base font-semibold text-gray-800 mb-2.5
                               md:text-sm md:mb-2.5 md:flex-shrink-0
                               lg:text-xs">{slide.text}</h1> {/* Original .product-title and media queries */}
                {/* รายละเอียดผลิตภัณฑ์: ขนาดตัวอักษร, สี, line-height, margin-bottom, overflow */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow overflow-hidden
                              md:text-xs md:leading-relaxed md:mb-4 md:flex-shrink-0 md:max-h-none md:overflow-y-hidden md:whitespace-normal md:w-auto
                              lg:text-xs">{truncateContent(slide.content, 100)}</p> 
              </div>
            </Link>
          </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;
