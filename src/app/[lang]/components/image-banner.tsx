import type { FC } from 'react';
import Image from 'next/image';
interface ImageBannerProps {
  src: string;
  alt: string;
}
const ImageBanner: FC<ImageBannerProps> = ({ src, alt }) => {
  return (
    <section className="w-full">
      <div className="relative w-full h-[300px] sm:h-[400px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default ImageBanner;