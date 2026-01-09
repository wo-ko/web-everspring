
import Fungicide from "./Fungicide";
import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

export default async function Page() {
  const fungicide = await getProductsByCategoryId(
    PRODUCT_CATEGORY.FUNGICIDE // = 3
  );

  return <Fungicide sortOrder="asc" activities={fungicide} />;
}
