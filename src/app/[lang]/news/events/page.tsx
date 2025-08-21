"use client";
import ActivitiesSection from "../../components/activities-section";

const sampleActivities = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/dyg6r8pec/image/upload/v1755657251/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%81%E0%B8%A1%E0%B9%88-01_zroxzi.jpg",
    title: { th: "วันแม่แห่งชาติ", en: "Mother’s Day" },
    description: {
      th: "วันแม่แห่งชาติ 12 สิงหาคม 2568",
      en: "Mother’s Day, 12 August 2025",
    },
    linkUrl: "#",
  },
];

export default function Events() {
  return (
    <div>
      <main>
        <ActivitiesSection
          titles={{ th: "กิจกรรม", en: "Events" }}
          activities={sampleActivities}
        />
      </main>
    </div>
  );
}
