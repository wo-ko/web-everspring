import Press from "./press/page";
import Events from "./events/page";
import Career from "./careers/page";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: {
    th: "บริษัท เอเวอร์สปริง อโกรเคม จำกัด ข่าวสาร สมัครงาน",
    en: "Everspring Agrochem Co., Ltd. News & Careers",
  },
  description: {
    th: "รวมข่าวสาร บทความ กิจกรรม และโอกาสร่วมงานกับบริษัท",
    en: "News, articles, events and career opportunities at Everspring Agrochem.",
  },
  keywords: {
    th: ["ข่าวสาร", "บทความ", "กิจกรรม", "สมัครงาน", "เอเวอร์สปริง"],
    en: ["news", "articles", "events", "careers", "Everspring"],
  },
});

export default function News() {
  return (
    <div>
      <h1 className="sr-only">ข่าวสารของบริษัท เอเวอร์สปริง อโกรเคม / News</h1>
      <Press />
      <Events />
      <Career />
    </div>
  );
}
