interface ImageRightTextProps {
  imageSrc: string;
  altText?: string;
  title?: string;
  description: string;
}

function ImageRightText({
  imageSrc,
  altText = "Image",
  title,
  description,
}: ImageRightTextProps) {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-6 max-w-5xl mx-auto p-4">
      {/* ข้อความอยู่ซ้าย (mobile = ล่าง) */}
      <div className="md:w-1/2">
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
      </div>

      {/* รูปภาพอยู่ขวา */}
      <img
        src={imageSrc}
        alt={altText}
        className="w-full md:w-1/2 rounded-lg object-cover"
      />
    </div>
  );
}

export default ImageRightText;
