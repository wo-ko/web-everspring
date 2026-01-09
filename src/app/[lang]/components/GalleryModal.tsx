"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  onSelectImage: (index: number) => void;
};

export default function GalleryModal({
  open,
  onClose,
  title,
  images,
  onSelectImage,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg">{title}</h3>
          <button onClick={onClose} className="text-white text-xl">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer flex justify-center"
              onClick={() => onSelectImage(index)}
            >
              <img
                src={img}
                alt=""
                className="max-w-full max-h-[600px] object-contain bg-black rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
