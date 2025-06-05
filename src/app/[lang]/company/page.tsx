"use client";
import { useThemeContext } from "@app/context/theme-context";
import { ILayoutProp } from "@app/types/context";
import { displayComponentPattern } from "@app/utils/golbal";
import SideImageLayout from "../components/side-Image-layout";
import StackedImagesLayout from "../components/stacked-images-layout";

export default function CompanyPage() {
  const { themeLayout, themeContent } = useThemeContext();

  console.log("theme", themeContent);
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
        titleColor="#fff"
        imagePosition="middle"
      />

      <StackedImagesLayout
        content="บริษัทเอเวอร์สปริง อโกรเคมจำกัด ดำเนินธุรกิจเกี่ยวกับการนำเข้า-ส่งออกสารเคมีเกษตรกลุ่มหลัก คือสารกำจัดวัชพืช สารกำจัดแมลง สารป้องกันกำจัดโรคพืช และธาตุอาหารพืช โดยเน้นความร่วมมือ ระหว่างผู้ประกอบการของชาวไทยและจีน ทำให้มีแหล่งนำเข้าในราคาต้นทุนที่ถูกกว่า และนำมาจำหน่ายให้กับผู้ผลิตปุ๋ย ในประเทศไทยและต่างประเทศพร้อมกับขึ้นทะเบียนการค้ากับกระทรวงเกษตร"
        images={[
          "https://media.istockphoto.com/id/2005352945/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/loch-shiel-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%81%E0%B9%83%E0%B8%99%E0%B8%8A%E0%B9%88%E0%B8%A7%E0%B8%87%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AD%E0%B8%B2%E0%B8%97%E0%B8%B4%E0%B8%95%E0%B8%A2%E0%B9%8C%E0%B8%82%E0%B8%B6%E0%B9%89%E0%B8%99%E0%B9%83%E0%B8%99%E0%B8%A4%E0%B8%94%E0%B8%B9%E0%B8%AB%E0%B8%99%E0%B8%B2%E0%B8%A7.jpg?s=1024x1024&w=is&k=20&c=xoZ6agh1BPx1hjVX5GdFUA82MTz09lT0vUvlDCM6PTE=",
        ]}
        imageSize="w-25 h-25"
        imageGapX="gap-x-10"
        imageGapY="gap-y-10"
        titleColor="#1a73e8"
        imagePosition="top"
      />

      <StackedImagesLayout
        title="นโยบายคุณภาพ"
        content="เราคือสปาที่เชี่ยวชาญในด้านการดูแลสุขภาพแบบองค์รวม"
        subContent={`ดั่งคำขวัญที่ว่า “คุณภาพมาตราฐาน บริการฉับไว ใส่ใจลูกค้า\nพัฒนาอย่างต่อเนื่อง และห่วงใยสิ่งแวดล้อม!”`}
        subContentFontSize="text-1xl"
        subContentColor="#009646"
        subContentBackground="border-only"
      />

      <StackedImagesLayout
        title="พันธกิจ"
        content={`1. องค์กรดำเนินธุรกิจให้สอดคล้องกับข้อกฎหมาย\n2. ส่งเสริมให้พนักงานตระหนักด้านสิ่งแวดล้อมให้สอดคล้องกับข้อปฎิบัติของบริษัท\n 3. ควบคุมในกระบวนการด้านการปฎิบัติงานด้านสิ่งแวดล้อม\n 4. ป้องกัน เฝ้าติดตาม และตรวจวัดเรื่องมลภาวะด้านสิ่งแวดล้อม`}
        images={[
          "https://media.istockphoto.com/id/2195989736/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%B5%E0%B8%AA%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B9%83%E0%B8%99%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B9%82%E0%B8%94%E0%B8%A2%E0%B9%80%E0%B8%89%E0%B8%9E%E0%B8%B2%E0%B8%B0%E0%B9%83%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%9E%E0%B8%B2%E0%B8%B0%E0%B8%9B%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AB%E0%B9%87%E0%B8%94%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%87%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%95%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%A0%E0%B8%B2%E0%B8%8A%E0%B8%99%E0%B8%B0%E0%B8%9C%E0%B8%B1%E0%B8%81.jpg?s=1024x1024&w=is&k=20&c=SPX_X6E1_LpkuZiO50896tydTkdChIMR6dw9yJ4U5r4=",
        ]}
        imageSize="w-25 h-25"
        subContentFontSize="text-1xl"
        subContentColor="#009646"
        subContentBackground="border-only"
      />

      <StackedImagesLayout
        title="คุณภาพบริษัท"
        content={`บริษัทเอเวอร์สปริง อโกรเคม จำกัด ผู้นำเข้าผลิตแบ่งบรรจุ \nสินค้าเคมีเกษตรที่ได้รับการรับรองมาตราฐาน ISO 9001 และ 14001`}
        images={[
          "https://www.arenasolutions.com/wp-content/uploads/what-is-iso-9001-compliance.png",
          "https://www.citrecolor.it/wp-content/uploads/2021/02/iso-14001.png",
        ]}
        titleColor="#fff"
        imagePosition="middle"
      />

      {/* //เนื้อหา ซ้ายหรือขวา */}
      <SideImageLayout
        imageSrc="https://lh3.googleusercontent.com/proxy/m-VEe3aIeFdjGFGgfviEdDNa9tLkjhRyyccb2lOjC5HDoVaQo2X09Va9xWNt-ftRpF0Kf_39vjAhm3eOpobN9Xx7nN0Vig"
        title="เนื้อหา"
        content="เนื้อหา"
        reverse={false}
        imageWidth="w-64"
        imageHeight="h-64"
        // className="bg-gray-100 p-4 rounded-lg"
      />
    </div>
  );
}
