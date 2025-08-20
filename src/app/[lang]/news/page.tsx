"use client";
import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { useContext } from "react";
import ContactCompany from "../components/contact-company";
import ActivitiesSection from "../components/activities-section";
import Peess from "./press/page";
import Events from "./events/page";
import Carrier from "./carrier/page";

const sampleActivities = [
  {
    id: 1,
    imageUrl:
      "https://topgolfthailand.com/wp-content/uploads/2023/10/blog-7.jpg",
    title: "นโยบายประจำปี 2566 ร่วมกับร้านรุ่งอนันต์",
    description: "งานขายประจำปี 2566 ร่วมกับร้านรุ่งอนันต์",
    linkUrl: "#", // ลิงก์ไปยังหน้ารายละเอียด
  },
  {
    id: 2,
    imageUrl:
      "http://anubandamnoen.com/_files_school/70102030/data/70102030_0_20210212-195024.jpg",
    title: "กิจกรรม AG-GRO NEW GEN 2023 : ศึกษาดูงานนอกสถานที่",
    description: "กิจกรรม AG-GRO NEW GEN 2023 : ศึกษาดูงานนอกสถานที่",
    linkUrl: "#",
  },
  // สามารถเพิ่มกิจกรรมอื่นๆ ได้ที่นี่
  // You can add other activities here
  {
    id: 3,
    imageUrl:
      "https://fth0.com/uppic/22102176/activity/22102176_0_20240524-102930.jpg",
    title: "หัวข้อกิจกรรมใหม่ที่น่าสนใจ",
    description: "คำอธิบายสั้นๆ เกี่ยวกับกิจกรรมนี้",
    linkUrl: "#",
  },
];

export default function News() {
  const { lang } = useContext(ThemeContext);
  const { themeColor1 } = useThemeContext();
  return (
    <div>
      <Peess />
      <Events />
      <Carrier />
    </div>
  );
}
