import type { FC } from 'react';

interface ImageBannerProps {
  src: string;
  alt: string;
}
const ImageBanner: FC<ImageBannerProps> = ({ src, alt }) => {
  return (
    <section className="w-full">
        <div
        className="relative w-full overflow-hidden" 
      >
        <img
          src={src}
          alt={alt}
          // className="object-cover w-full h-full absolute top-0 left-0" 
        />
      </div>
    </section>
  );
};

export default ImageBanner;