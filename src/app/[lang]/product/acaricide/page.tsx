// import AcaricideUI from "./AcaricideUI";
// import { acaricide } from "@app/[lang]/data/acaricide";

// export default function Page() {
//   return (
//     <AcaricideUI sortOrder="asc" activities={acaricide} isAllPage={false} />
//   );
// }

import AcaricideUI from "./AcaricideUI";
import { getProductsByCategoryId } from "@app/lib/products";
import { PRODUCT_CATEGORY } from "@app/constants/productCategory";

export default async function Page() {
  const acaricide = await getProductsByCategoryId(PRODUCT_CATEGORY.ACARICIDE);

  return (
    <AcaricideUI sortOrder="asc" activities={acaricide} isAllPage={false} />
  );
}
