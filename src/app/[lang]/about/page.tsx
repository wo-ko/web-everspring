"use client";
import { useThemeContext } from "@app/context/theme-context";
import { ILayoutProp } from "@app/types/context";
import { displayComponentPattern } from "@app/utils/golbal";
import StackedImagesLayout from "../components/stacked-images-layout";
import PatternComponents from "@app/components/pattern-components";

export default function AboutPage() {
  const { themeLayout, themeContent, themeColor1 } = useThemeContext();
  const imageList = [
    {
      src: "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749548906/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-06_0_qagz4a.jpg",
      alt: "ป้ายเตือนอันตราย",
    },
    {
      src: "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749548907/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-07_0_qhh8et.jpg",
      alt: "อุปกรณ์แล็บ",
    },
    {
      src: "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749548910/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-08_0_vek3ro.jpg",
      alt: "เครื่องบรรจุภัณฑ์ 1",
    },
    {
      src: "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749548909/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-09_0_ksl60l.jpg",
      alt: "เครื่องบรรจุภัณฑ์ 2",
    },
  ];

  return (
    <div>
      <PatternComponents pageName="about" />
    </div>
  );
}
