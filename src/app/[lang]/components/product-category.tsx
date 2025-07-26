'use client';
type ProductCategoryProps = {
  iconSrc: string;
  altText: string;
  label: string;
};

const ProductCategory: React.FC<ProductCategoryProps> = ({ iconSrc, altText, label }) => {
 return (
    <div className="flex flex-col items-center text-center w-[150px]">
      <div className="w-[120px] h-[120px] rounded-full flex justify-center items-center mb-4 shadow-md">
        <img src={iconSrc} alt={altText} className="w-[70%] h-[70%] object-contain" />
      </div>
      <p className="text-base text-gray-800 font-semibold">{label}</p>
    </div>
  );
};

export default ProductCategory;