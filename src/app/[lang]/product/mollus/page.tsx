import MollusUI from "./MollusUI";
import { DataMollus } from "@app/[lang]/data/mollus";

export default function Page() {
  return <MollusUI sortOrder="asc" activities={DataMollus} />;
}
