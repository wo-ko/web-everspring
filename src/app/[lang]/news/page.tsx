// "use client";

import Peess from "./press/page";
import Events from "./events/page";
import Carrier from "./carrier/page";
import { generateMetadata } from "@app/utils/seo";

export const metadata = generateMetadata({
  title: "ข่าวสาร | News ",
  description: "รวมข่าวสาร บทความ กิจกรรม และโอกาสร่วมงานกับบริษัท / News, articles, events and career opportunities at Everspring Agrochem.",
  keywords: "ข่าวสาร, news, บทความ, events, กิจกรรม, careers, เอเวอร์สปริง"
});

export default function News() {
  return (
    <div>
      <h1 className="sr-only">ข่าวสารของบริษัท เอเวอร์สปริง อโกรเคม / News</h1>
      <Peess />
      <Events />
      <Carrier />
    </div>
  );
}
