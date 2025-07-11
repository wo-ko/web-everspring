///////////// 6 รูปด้านซ้าย text ขวา

interface ImageLeftTextProps {
  imageSrc: string;
  altText?: string;
  title?: string;
  description: string;
}

function ImageLeftText({
  imageSrc,
  altText = "Image",
  title,
  description,
}: ImageLeftTextProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto p-4">
      {/* Image on the left */}
      <img
        src={imageSrc}
        alt={altText}
        className="w-full md:w-1/2 rounded-lg object-cover"
      />

      {/* Text on the right */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default ImageLeftText;
