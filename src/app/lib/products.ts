export interface Product {
  productCategoryId: number;
  productId: number;
  productName: {
    th: string;
    en: string;
  };
  price: number;
  productImgUrl: string | null;
  stock: number;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products/grouped-by-category`;

/** ดึงสินค้าทั้งหมด */
export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

/** กรองด้วย categoryId เดียว (1 / 2 / 3 / 4) */
export async function getProductsByCategoryId(
  categoryId: number
): Promise<Product[]> {
  const data = await fetchAllProducts();
  return data.filter((item) => item.productCategoryId === categoryId);
}

export async function getProductsByCategoryIds(
  categoryIds: number[]
): Promise<Product[]> {
  const data = await fetchAllProducts();
  return data.filter((item) => categoryIds.includes(item.productCategoryId));
}
