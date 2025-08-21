import AcaricideUI from "./AcaricideUI";
import { acaricide } from "@app/[lang]/data/acaricide";

export default function Page() {
  return (
    <AcaricideUI sortOrder="asc" activities={acaricide} isAllPage={false} />
  );
}
