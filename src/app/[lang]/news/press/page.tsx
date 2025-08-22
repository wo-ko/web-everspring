"use client";
import ActivitiesSection from "../../components/activities-section";

const sampleActivities = [
  {
    id: 1,
    imageUrl:
      "https://topgolfthailand.com/wp-content/uploads/2023/10/blog-7.jpg",
    title: {
      th: "นโยบายประจำปี 2566 ร่วมกับร้านรุ่งอนันต์",
      en: "Annual Policy 2023 in Collaboration with Rung Anan Shop",
    },
    description: {
      th: "กิจกรรมปาร์ตี้",
      en: "Partyyyyy",
    },
    linkUrl: "#",
  },
  {
    id: 2,
    imageUrl:
      "http://anubandamnoen.com/_files_school/70102030/data/70102030_0_20210212-195024.jpg",
    title: {
      th: "กิจกรรม AG-GRO NEW GEN 2023 : ศึกษาดูงานนอกสถานที่",
      en: "AG-GRO NEW GEN 2023: Off-site Study Visit",
    },
    description: {
      th: "กิจกรรม AG-GRO NEW GEN 2023 : ศึกษาดูงานนอกสถานที่",
      en: "AG-GRO NEW GEN 2023: Students visited off-site locations for study purposes",
    },
    linkUrl: "#",
  },
  {
    id: 3,
    imageUrl:
      "https://fth0.com/uppic/22102176/activity/22102176_0_20240524-102930.jpg",
    title: {
      th: "หัวข้อกิจกรรมใหม่ที่น่าสนใจ",
      en: "Interesting New Activity Topics",
    },
    description: {
      th: "คำอธิบายสั้นๆ เกี่ยวกับกิจกรรมนี้",
      en: "A brief description about this activity",
    },
    linkUrl: "#",
  },
];

export default function Peess() {
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
