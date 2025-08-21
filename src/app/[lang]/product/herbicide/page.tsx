import { herbicideProducts } from "@app/[lang]/data/herbicide";
import HerbicideUI from "./HerbicideUI";

export default function Page() {
  return <HerbicideUI sortOrder="asc" activities={herbicideProducts} />;
}
