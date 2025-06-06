"use client";
import { useThemeContext } from "@app/context/theme-context";
import { ILayoutProp } from "@app/types/context";
import { displayComponentPattern } from "@app/utils/golbal";
import StackedImagesLayout from "../components/stacked-images-layout";

export default function AboutPage() {
  const { themeLayout, themeContent, themeColor1 } = useThemeContext();

  return (
    <div>
      {themeLayout.about.map((row: ILayoutProp) => {
        return <div>{displayComponentPattern(row, themeContent.about)}</div>;
      })}

      <StackedImagesLayout
        titleColor={themeColor1}
        content={``}
        subContent={`ดั่งคำขวัญที่ว่า\n \n “คุณภาพมาตราฐาน บริการฉับไว ใส่ใจลูกค้า\nพัฒนาอย่างต่อเนื่อง และห่วงใยสิ่งแวดล้อม!”`}
        subContentFontSize="text-1xl"
        subContentColor={themeColor1}
        subContentBackground="border-only"
      />
      <StackedImagesLayout
        title="พันธกิจขององค์กร"
        titleColor={themeColor1}
        titleAlign="left"
        contentAlign="left"
        content={`1. องค์กรดำเนินธุรกิจให้สอดคล้องกับข้อกฎหมาย\n2. ส่งเสริมให้พนักงานตระหนักด้านสิ่งแวดล้อมให้สอดคล้องกับข้อปฎิบัติของบริษัท\n 3. ควบคุมในกระบวนการด้านการปฎิบัติงานด้านสิ่งแวดล้อม\n 4. ป้องกัน เฝ้าติดตาม และตรวจวัดเรื่องมลภาวะด้านสิ่งแวดล้อม`}
        images={[
          "https://media.istockphoto.com/id/2195989736/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%B5%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B9%80%E0%B8%89%E0%B8%9E%E0%B8%B2%E0%B8%B0%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9E%E0%B8%B2%E0%B8%B0%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AB%E0%B9%87%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%A0%E0%B8%B2%E0%B8%8A%E0%B8%99%E0%B8%B0%E0%B8%9C%E0%B8%B1%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=SPX_X6E1_LpkuZiO50896tydTkdChIMR6dw9yJ4U5r4=",
        ]}
        imageSize="w-25 h-25"
        subContentFontSize="text-1xl"
        subContentColor={themeColor1}
        subContentBackground="border-only"
      />
    </div>
  );
}
