import { insecticideProducts } from "@app/[lang]/data/insecticide";
import InsecticideUI from "./InsecticideUI";

export default function Page() {
  return <InsecticideUI sortOrder="asc" activities={insecticideProducts} />;
}
