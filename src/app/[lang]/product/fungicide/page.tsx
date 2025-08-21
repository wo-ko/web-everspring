import { diseaseControlProducts } from "@app/[lang]/data/fungicide";
import Fungicide from "./Fungicide";

export default function Page() {
  return <Fungicide sortOrder="asc" activities={diseaseControlProducts} />;
}
