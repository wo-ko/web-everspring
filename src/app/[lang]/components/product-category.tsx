'use client';
type ProductCategoryProps = {
  iconSrc: string;
  altText: string;
  label: string;
};

const ProductCategory: React.FC<ProductCategoryProps> = ({ iconSrc, altText, label }) => {
  return (
    <div className="product-category">
      <div className="icon-product-category">
        <img src={iconSrc} alt={altText} className="product-category-icon" />
      </div>
      <p className="product-category-label">{label}</p>
    </div>
  );
};

export default ProductCategory;