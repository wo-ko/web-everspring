// import MollusUI from "./MollusUI";
// import { DataMollus } from "@app/[lang]/data/mollus";

// export default function Page() {
//   return <MollusUI sortOrder="asc" activities={DataMollus} />;
// }

import MollusUI from "./MollusUI";
import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

export default async function Page() {
  const mollus = await getProductsByCategoryId(
    PRODUCT_CATEGORY.MOLLUS // = 6
  );

  return <MollusUI sortOrder="asc" activities={mollus} />;
}
