import ImageLeftText from "../components/image-left-text";
import ImageRightText from "../components/image-right-text";
import Ptag from "../components/p-tag";

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>Home</h1>
        <h1>4. เป็น tag P</h1>
        <Ptag>นี่คือข้อความในแท็ก</Ptag>
        <Ptag className="text-red-500">ข้อความนี้สีแดง</Ptag>
      </div>
      <div>
        <ImageLeftText
          imageSrc="/my-image.jpg"
          title="รูปอยู่ขวาข้อความอยู่ซ้าย" // ใส่หรือไม่ใส่ก็ได้
          description="เราคือทีมงานที่มีประสบการณ์ด้านสุขภาพและความงาม พร้อมบริการคุณภาพระดับมืออาชีพ"
        />
      </div>
      <div>
        <ImageRightText
          imageSrc="/my-image.jpg"
          title="รูปอยู่ซ้ายข้อความอยู่ขวา" // ใส่หรือไม่ใส่ก็ได้
          description="เราคือทีมงานที่มีประสบการณ์ด้านสุขภาพและความงาม พร้อมบริการคุณภาพระดับมืออาชีพ"
        />
      </div>
    </div>
  );
}
