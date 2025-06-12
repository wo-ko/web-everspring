"use client";
import { useThemeContext } from "@app/context/theme-context";
import { ILayoutProp } from "@app/types/context";
import { displayComponentPattern } from "@app/utils/golbal";
import SideImageLayout from "../components/side-Image-layout";
import StackedImagesLayout from "../components/stacked-images-layout";
import ImageGallery from "../components/image-display";

export default function CompanyPage() {
  const { themeLayout, themeContent, themeColor1 } = useThemeContext();

  // ใช้งาน
  console.log("themeColor", themeColor1);

  return (
    <div>
      <StackedImagesLayout
        title="บริษัทในเครือ"
        content="บริษัทเอเวอร์สปริง อโกรเคมจำกัด ดำเนินธุรกิจเกี่ยวกับการนำเข้า-ส่งออกสารเคมีเกษตรกลุ่มหลัก คือสารกำจัดวัชพืช สารกำจัดแมลง สารป้องกันกำจัดโรคพืช และธาตุอาหารพืช โดยเน้นความร่วมมือ ระหว่างผู้ประกอบการของชาวไทยและจีน ทำให้มีแหล่งนำเข้าในราคาต้นทุนที่ถูกกว่า และนำมาจำหน่ายให้กับผู้ผลิตปุ๋ย ในประเทศไทยและต่างประเทศพร้อมกับขึ้นทะเบียนการค้ากับกระทรวงเกษตร"
        images={[
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749102107/LINE_ALBUM_Ever_spring_250604_4-removebg-preview_ryv5np.png",
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749102107/LINE_ALBUM_Ever_spring_250604_3-removebg-preview_zgquer.png",
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749102107/LINE_ALBUM_Ever_spring_250604_5-removebg-preview_wbb6gc.png",
        ]}
        imageSize="w-30 h-24"
        imageGapX="gap-x-10"
        imageGapY="gap-y-10"
        titleColor={themeColor1}
        imagePosition="middle"
      />

      <StackedImagesLayout
        content="บริษัทเอเวอร์สปริง อโกรเคมจำกัด ดำเนินธุรกิจเกี่ยวกับการนำเข้า-ส่งออกสารเคมีเกษตรกลุ่มหลัก คือสารกำจัดวัชพืช สารกำจัดแมลง สารป้องกันกำจัดโรคพืช และธาตุอาหารพืช โดยเน้นความร่วมมือ ระหว่างผู้ประกอบการของชาวไทยและจีน ทำให้มีแหล่งนำเข้าในราคาต้นทุนที่ถูกกว่า และนำมาจำหน่ายให้กับผู้ผลิตปุ๋ย ในประเทศไทยและต่างประเทศพร้อมกับขึ้นทะเบียนการค้ากับกระทรวงเกษตร"
        images={[
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749194880/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-01_0_sgcay2.jpg",
        ]}
        imageSize="w-[1000px] h-[400px]"
        imageGapX="gap-x-10"
        imageGapY="gap-y-10"
        titleColor="#1a73e8"
        imagePosition="top"
      />

      <StackedImagesLayout
        title="นโยบายคุณภาพ"
        titleColor={themeColor1}
        content={`บริษัทเอเวอร์สปริง อโกรเคม จำกัด มีความมุ่งมั่นที่จะเป็นบริษัทที่มีระบบการบริหารคุณภาพตามมาตราฐานสากลเพื่อให้สินค้าสารป้องกันจำกัดศัตรูพืช และธาตุอาหารพืช ที่บริษัทผลิตและจำหน่าย มีคุณภาพตรงตามความต้องการของลูกค้าโดยทั้งนี้บริษัทมุ่งเน้นให้ผลิตภัณฑ์ของบริษัทสามารถตอบสนองต่อความพึ่งพอใจของลูกค้าและมีการปรับปรุงระบบทำงานของบริษัทให้มีการพัฒนาอย่างต่อเนื่อง`}
        subContent={`ดั่งคำขวัญที่ว่า\n \n “คุณภาพมาตราฐาน บริการฉับไว ใส่ใจลูกค้า\nพัฒนาอย่างต่อเนื่อง และห่วงใยสิ่งแวดล้อม!”`}
        subContentFontSize="text-1xl"
        subContentColor={themeColor1}
        subContentBackground="border-only"
      />

      <StackedImagesLayout
        title="พันธกิจ"
        titleColor={themeColor1}
        content={`1. องค์กรดำเนินธุรกิจให้สอดคล้องกับข้อกฎหมาย\n2. ส่งเสริมให้พนักงานตระหนักด้านสิ่งแวดล้อมให้สอดคล้องกับข้อปฎิบัติของบริษัท\n 3. ควบคุมในกระบวนการด้านการปฎิบัติงานด้านสิ่งแวดล้อม\n 4. ป้องกัน เฝ้าติดตาม และตรวจวัดเรื่องมลภาวะด้านสิ่งแวดล้อม`}
        images={[
          "https://res.cloudinary.com/dyg6r8pec/image/upload/v1749194146/%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%AD%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C-05_0_fkjdat.jpg",
        ]}
        imageSize="w-[1000px] h-[400px]"
        subContentFontSize="text-1xl"
        subContentColor={themeColor1}
        subContentBackground="border-only"
      />

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

      {/* //เนื้อหา ซ้ายหรือขวา */}
      <SideImageLayout
        imageSrc="https://lh3.googleusercontent.com/proxy/m-VEe3aIeFdjGFGgfviEdDNa9tLkjhRyyccb2lOjC5HDoVaQo2X09Va9xWNt-ftRpF0Kf_39vjAhm3eOpobN9Xx7nN0Vig"
        title="เนื้อหา"
        content="เนื้อหา"
        reverse={false}
        imageWidth="w-70"
        imageHeight="h-70"
        // className="bg-gray-500 p-7 rounded-lg"
      />
    </div>
  );
}
