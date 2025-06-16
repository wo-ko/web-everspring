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
        images={[
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749194133/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-03_0_wrvobb.jpg",
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749194135/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-04_0_o9jg9x.jpg",
        ]}
        imageSize="w-[500px] h-[400px]"
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
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749194146/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-05_0_fkjdat.jpg",
        ]}
        imageSize="w-[1000px] h-[400px]"
        subContentFontSize="text-1xl"
        subContentColor={themeColor1}
        subContentBackground="border-only"
      />
      <p>
        บริษัทเอเวอร์สปริง อโกรเคม จำกัด ก่อตั้งในปี 2544 เป็นผู้นำเข้า
        ผลิตแบ่่งบรรจุ และจัดจำหน่ายสินค้าเคมีเกษตรทั้งสารกำจัดวัชพืช
        สารกำจัดแมลง สารป้องกันกำจัดโรคพืช และฮอร์โมนอาหารเสริม
      </p>

      <StackedImagesLayout
        title="คุณภาพบริษัท"
        content={`บริษัทเอเวอร์สปริง อโกรเคม จำกัด ผู้นำเข้าผลิตแบ่งบรรจุ \nสินค้าเคมีเกษตรที่ได้รับการรับรองมาตราฐาน ISO 9001 และ 14001`}
        images={[
          "https://www.arenasolutions.com/wp-content/uploads/what-is-iso-9001-compliance.png",
          "https://www.citrecolor.it/wp-content/uploads/2021/02/iso-14001.png",
        ]}
        titleColor={themeColor1}
        imagePosition="middle"
      />
    </div>
  );
}
