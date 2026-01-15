// import { insecticideProducts } from "@app/[lang]/data/insecticide";
// import InsecticideUI from "./InsecticideUI";

// export default function Page() {
//   return <InsecticideUI sortOrder="asc" activities={insecticideProducts} />;
// }

import InsecticideUI from "./InsecticideUI";
import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

export default async function Page() {
  const insecticide = await getProductsByCategoryId(
    PRODUCT_CATEGORY.INSECTICIDE // = 2
  );

  return <InsecticideUI sortOrder="asc" activities={insecticide} />;
}
