// import { DataPlant } from "@app/[lang]/data/plant";
// import PlantUI from "./PlantUI";

// export default function Page() {
//   return <PlantUI sortOrder="asc" activities={DataPlant} />;
// }

import PlantUI from "./PlantUI";
import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

export default async function Page() {
  const plant = await getProductsByCategoryId(
    PRODUCT_CATEGORY.PLANT // = 5
  );

  return <PlantUI sortOrder="asc" activities={plant} />;
}
