import { DataPlant } from "@app/[lang]/data/plant";
import PlantUI from "./PlantUI";

export default function Page() {
  return <PlantUI sortOrder="asc" activities={DataPlant} />;
}
