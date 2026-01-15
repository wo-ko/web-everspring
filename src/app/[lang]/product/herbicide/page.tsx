// import { herbicideProducts } from "@app/[lang]/data/herbicide";
// import HerbicideUI from "./HerbicideUI";

// export default function Page() {
//   return <HerbicideUI sortOrder="asc" activities={herbicideProducts} />;
// }

import HerbicideUI from "./HerbicideUI";
import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

export default async function Page() {
  const herbicide = await getProductsByCategoryId(
    PRODUCT_CATEGORY.HERBICIDE // = 1
  );

  return <HerbicideUI sortOrder="asc" activities={herbicide} />;
}
