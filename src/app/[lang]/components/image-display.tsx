"use client";

interface ImageItem {
  src: string;
  alt?: string;
}

interface ImageDisplayProps {
  images: ImageItem[];
  columns?: number;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ images, columns }) => {
  const getGridColsClass = (cols: number) => {
    switch (cols) {
      case 1:
        return "md:grid-cols-1";
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-3";
      case 4:
        return "md:grid-cols-4";
      default:
        return "md:grid-cols-3";
    }
  };

  return (
    <div
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${getGridColsClass(
        columns ?? 3
      )}`}
    >
      {images.map((img, idx) => (
        <div key={idx} className="relative w-full aspect-square">
          <img
            src={img.src}
            alt={img.alt || `image-${idx}`}
            className="object-cover rounded-lg shadow-md w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
