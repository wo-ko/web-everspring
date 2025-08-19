import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type Slide = {
    image?: string;
    link: string;
};

type SwiperProps = {
    obj: Slide[];
};

const ImageSwiper: React.FC<SwiperProps> = ({ obj }) => {
    return (
        <div className="relative w-full">
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-1/2"
            // className="w-full "
        >
            {obj?.length ? obj.map((slide, index) => (
                <SwiperSlide key={index} className="text-center text-lg bg-gray-700 flex justify-center items-center">
                    {/* <div className="relative w-full">
                        <img src={slide.image || ''} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
                    </div> */}
                    <Link href={slide?.link} target="_blank">
                        <div className="relative w-full">
                           <img src={slide?.image || ''} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
                        </div>
                    </Link>
                </SwiperSlide>
            )) : null}
        </Swiper>
        </div>
    );
};

export default ImageSwiper;
