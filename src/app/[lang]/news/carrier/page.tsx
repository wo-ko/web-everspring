"use client";
import { ThemeContext } from "@app/context/theme-context";
import { useContext } from "react";

const jobOpenings = [
  {
    id: 1,
    title: {
      th: "เจ้าหน้าที่การตลาด (Marketing Officer)",
      en: "Marketing Officer",
    },
    location: {
      th: "กรุงเทพมหานคร (เขตบึงกุ่ม)",
      en: "Bangkok (Bueng Kum District)",
    },
    type: {
      th: "งานประจำ",
      en: "Full-time",
    },
    salary: {
      th: "ตามตกลง",
      en: "Negotiable",
    },
    workingHours: {
      days: {
        th: "วันจันทร์ – วันศุกร์",
        en: "Monday – Friday",
      },
      time: {
        th: "08.30 - 17.30 น.",
        en: "08:30 AM - 5:30 PM",
      },
      note: {
        th: "หยุดวันเสาร์-อาทิตย์ แต่สามารถรับโทรศัพท์และปฏิบัติงานได้ในกรณีจำเป็น",
        en: "Off on Saturday-Sunday, but can answer calls or work if necessary",
      },
    },
    requirements: {
      gender: {
        th: "ไม่ระบุ",
        en: "Not specified",
      },
      age: {
        th: "23-40 ปี",
        en: "23-40 years",
      },
      education: {
        th: "ปริญญาตรี",
        en: "Bachelor's degree",
      },
      experience: {
        th: "1-3 ปี",
        en: "1-3 years",
      },
      additionalQualifications: {
        th: [
          "สามารถขับรถยนต์ได้ (มีใบขับขี่)",
          "ใช้ Microsoft Word, Excel ได้ดี",
          "มีวุฒิการศึกษา วทบ. เกษตรศาสตร์ จะพิจารณาเป็นพิเศษ",
        ],
        en: [
          "Able to drive (with license)",
          "Proficient in Microsoft Word, Excel",
          "Bachelor’s degree in Agricultural Science preferred",
        ],
      },
    },
    benefits: {
      th: [
        "ประกันสังคม",
        "ยูนิฟอร์มบริษัท",
        "งานเลี้ยงสรรค์ประจำปี",
        "กองทุนสำรองเลี้ยงชีพ",
        "ท่องเที่ยวประจำปี (ขึ้นอยู่กับผลกำไรในแต่ละปี)",
        "โบนัสประจำปี (ขึ้นอยู่กับผลกำไรในแต่ละปี)",
        "มีรถยนต์ให้ใช้ปฏิบัติงานนอกพื้นที่ หรือการเดินทางไปโรงงานสาขากำแพงแสน",
      ],
      en: [
        "Social Security",
        "Company Uniform",
        "Annual Party",
        "Provident Fund",
        "Annual Trip (depending on yearly profit)",
        "Annual Bonus (depending on yearly profit)",
        "Company car for offsite work or travel to Kamphaeng Saen branch",
      ],
    },
    linkUrl:
      "https://mail.google.com/mail/?view=cm&to=pbl.devteam@gmail.com&su=Apply%20Marketing%20Officer",
  },
];

export default function Carrier() {
  const { lang } = useContext(ThemeContext);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-800">
        {lang === "th" ? "ตำแหน่งงานว่าง" : "Job Vacancies"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobOpenings.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-white border border-gray-200 rounded-xl flex flex-col"
          >
            {/* Job title */}
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              {job.title[lang as "th" | "en"]}
            </h2>

            {/* Location and type */}
            <p className="text-sm text-gray-600 mb-2">
              📍 {job.location[lang as "th" | "en"]} · ⏱{" "}
              {job.type[lang as "th" | "en"]}
            </p>

            {/* Working hours */}
            <p className="text-sm text-gray-600 mb-2">
              🕒 {job.workingHours.days[lang as "th" | "en"]} |{" "}
              {job.workingHours.time[lang as "th" | "en"]}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              {job.workingHours.note[lang as "th" | "en"]}
            </p>

            {/* Requirements */}
            <div className="mb-4">
              <h3 className="font-medium mb-1">
                {lang === "th" ? "คุณสมบัติ" : "Requirements"}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>
                  {lang === "th" ? "เพศ" : "Gender"}:{" "}
                  {job.requirements.gender[lang as "th" | "en"]}
                </li>
                <li>
                  {lang === "th" ? "อายุ" : "Age"}:{" "}
                  {job.requirements.age[lang as "th" | "en"]}
                </li>
                <li>
                  {lang === "th" ? "การศึกษา" : "Education"}:{" "}
                  {job.requirements.education[lang as "th" | "en"]}
                </li>
                <li>
                  {lang === "th" ? "ประสบการณ์" : "Experience"}:{" "}
                  {job.requirements.experience[lang as "th" | "en"]}
                </li>
                {job.requirements.additionalQualifications[
                  lang as "th" | "en"
                ].map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h3 className="font-medium mb-1">
                {lang === "th" ? "สวัสดิการ" : "Benefits"}
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {job.benefits[lang as "th" | "en"].map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Apply link */}
            <a
              href={`https://mail.google.com/mail/?view=cm&to=bandit.t@everspring.co.th&su=${encodeURIComponent(
                job.title[lang as "th" | "en"]
              )}&body=${encodeURIComponent(
                `จาก HR - Everspring,\n\nกรุณาแนบเอกสารสมัครงานเพื่อพิจารณาค่ะ\nแนบเอกสารดังนี้:\n1. CV / ประวัติย่อ\n2. จดหมายสมัครงาน (Cover Letter)\n3. ใบรับรองที่เกี่ยวข้อง (ถ้ามี)\n\nขอบคุณค่ะ`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:underline mt-auto"
            >
              {lang === "th" ? "สมัครตำแหน่งนี้" : "Apply"} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
