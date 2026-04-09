// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { ThemeContext } from "@app/context/theme-context";
// import type { JobContent } from "@/types/jobcontent";

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

// type CareerApiItem = {
//   newsId: string;
//   newsTitle: string;
//   newsTitleEn?: string | null;
//   preview: string | null;
//   previewEn?: string | null;
//   newsContent: unknown;
//   imgUrl: string | null;
//   isEnabled: boolean;
//   isEvents: number;
// };

// function parseCareerContent(content: unknown): JobContent[] {
//   if (!content) return [];

//   if (Array.isArray(content)) {
//     return content as JobContent[];
//   }

//   if (typeof content === "string") {
//     try {
//       const parsed = JSON.parse(content);

//       if (Array.isArray(parsed)) {
//         return parsed as JobContent[];
//       }

//       if (parsed && typeof parsed === "object") {
//         return [parsed as JobContent];
//       }

//       return [];
//     } catch {
//       return [];
//     }
//   }

//   if (typeof content === "object") {
//     return [content as JobContent];
//   }

//   return [];
// }

// export default function Career() {
//   const { lang } = useContext(ThemeContext);
//   const currentLang: "th" | "en" = lang === "en" ? "en" : "th";

//   const [jobOpenings, setJobOpenings] = useState<JobContent[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCareer() {
//       try {
//         const res = await fetch(API_URL, { cache: "no-store" });
//         const data = (await res.json()) as CareerApiItem[];

//         const filtered = (data ?? []).filter(
//           (i) => i.isEvents === 3 && i.isEnabled === false,
//         );

//         const mapped: JobContent[] = filtered.flatMap((i) =>
//           parseCareerContent(i.newsContent),
//         );

//         setJobOpenings(mapped);
//       } catch (error) {
//         console.error("fetch career error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCareer();
//   }, []);

//   if (loading) {
//     return <div className="text-sm text-gray-500">กำลังโหลดข้อมูล…</div>;
//   }

//   if (!jobOpenings.length) return null;

//   return (
//     <main className="max-w-6xl mx-auto px-4 py-16">
//       <h1 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-800">
//         {currentLang === "th" ? "ตำแหน่งงานว่าง" : "Job Vacancies"}
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {jobOpenings.map((job, index) => {
//           const jobTitle = job?.jobTitle?.[currentLang] ?? "";
//           const province = job?.location?.province?.[currentLang] ?? "";
//           const district = job?.location?.district?.[currentLang] ?? "";
//           const jobType = job?.jobType?.[currentLang] ?? "";
//           const salary = job?.salary?.[currentLang] ?? "";
//           const workDays = job?.workingHours?.days?.[currentLang] ?? "";
//           const workTime = job?.workingHours?.time?.[currentLang] ?? "";
//           const workNote = job?.workingHours?.note?.[currentLang] ?? "";
//           const gender = job?.requirements?.gender?.[currentLang] ?? "";
//           const age = job?.requirements?.age?.[currentLang] ?? "";
//           const education = job?.requirements?.education?.[currentLang] ?? "";
//           const experience = job?.requirements?.experience?.[currentLang] ?? "";
//           const additionalQualifications =
//             job?.requirements?.additionalQualifications?.[currentLang] ?? [];
//           const responsibilities = job?.responsibilities?.[currentLang] ?? [];
//           const benefits = job?.benefits?.[currentLang] ?? [];

//           return (
//             <React.Fragment key={index}>
//               <div className="p-6 bg-white border border-gray-200 rounded-xl flex flex-col">
//                 <h2 className="text-lg font-medium text-gray-900 mb-2">
//                   {jobTitle}
//                 </h2>

//                 <p className="text-sm text-gray-600 mb-2">
//                   📍 {[province, district].filter(Boolean).join(", ")} · ⏱{" "}
//                   {jobType}
//                 </p>

//                 <p className="text-sm text-gray-600 mb-2">💰 {salary}</p>

//                 <div className="mt-2 mb-4 space-y-2">
//                   <p className="text-sm text-gray-700">
//                     🕒 {workDays} | {workTime}
//                   </p>

//                   {workNote && (
//                     <p className="text-xs text-gray-500">{workNote}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <h3 className="font-medium mb-1">
//                     {currentLang === "th" ? "คุณสมบัติ" : "Requirements"}
//                   </h3>

//                   <ul className="list-disc list-inside text-sm text-gray-600">
//                     <li>
//                       {currentLang === "th" ? "เพศ" : "Gender"}: {gender}
//                     </li>
//                     <li>
//                       {currentLang === "th" ? "อายุ" : "Age"}: {age}
//                     </li>
//                     <li>
//                       {currentLang === "th" ? "การศึกษา" : "Education"}:{" "}
//                       {education}
//                     </li>
//                     <li>
//                       {currentLang === "th" ? "ประสบการณ์" : "Experience"}:{" "}
//                       {experience}
//                     </li>

//                     {additionalQualifications.map((q, i) => (
//                       <li key={i}>{q}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 {!!responsibilities.length && (
//                   <div className="mb-4">
//                     <h3 className="font-medium mb-1">
//                       {currentLang === "th"
//                         ? "หน้าที่รับผิดชอบ"
//                         : "Responsibilities"}
//                     </h3>

//                     <ul className="list-disc list-inside text-sm text-gray-600">
//                       {responsibilities.map((r, i) => (
//                         <li key={i}>{r}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <div className="mb-4">
//                   <h3 className="font-medium mb-1">
//                     {currentLang === "th" ? "สวัสดิการ" : "Benefits"}
//                   </h3>

//                   <ul className="list-disc list-inside text-sm text-gray-600">
//                     {benefits.map((b, i) => (
//                       <li key={i}>{b}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <a
//                   href={`https://mail.google.com/mail/?view=cm&to=bandit.t@everspring.co.th&su=${encodeURIComponent(
//                     jobTitle,
//                   )}&body=${encodeURIComponent(
//                     `${
//                       currentLang === "th" ? "สมัครตำแหน่ง" : "Applying for"
//                     }: ${jobTitle}

//                     ${
//                       currentLang === "th"
//                         ? `กรุณาแนบเอกสาร:
//                         1. CV / ประวัติย่อ
//                         2. Cover Letter
//                         3. เอกสารอื่น (ถ้ามี)
//                         ขอบคุณค่ะ`
//                         : `Please attach:
//                         1. CV / Resume
//                         2. Cover Letter
//                         3. Other supporting documents (if any)

//                         Thank you.`
//                     }`,
//                   )}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm text-green-600 hover:underline mt-auto"
//                 >
//                   ✉ {currentLang === "th" ? "สมัครตำแหน่งนี้" : "Apply"} →
//                 </a>
//               </div>

//               {(index === 2 || index === 5) && (
//                 <div className="col-span-full border-t border-gray-200 my-4" />
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@app/context/theme-context";
import {
  MapPin,
  Briefcase,
  CircleDollarSign,
  Clock,
  User,
  GraduationCap,
  Mail,
  ChevronRight,
  CheckCircle2,
  CalendarDays,
  Award,
} from "lucide-react";
import type { JobContent } from "@/types/jobcontent";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

type CareerApiItem = {
  newsId: string;
  newsTitle: string;
  newsTitleEn?: string | null;
  preview: string | null;
  previewEn?: string | null;
  newsContent: unknown;
  imgUrl: string | null;
  isEnabled: boolean;
  isEvents: number;
};

function parseCareerContent(content: unknown): JobContent[] {
  if (!content) return [];
  if (Array.isArray(content)) return content as JobContent[];
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed as JobContent[];
      if (parsed && typeof parsed === "object") return [parsed as JobContent];
      return [];
    } catch {
      return [];
    }
  }
  if (typeof content === "object") return [content as JobContent];
  return [];
}

export default function Career() {
  const { lang } = useContext(ThemeContext);
  const currentLang: "th" | "en" = lang === "en" ? "en" : "th";

  const [jobOpenings, setJobOpenings] = useState<JobContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareer() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data = (await res.json()) as CareerApiItem[];
        const filtered = (data ?? []).filter(
          (i) => i.isEvents === 3 && i.isEnabled === false,
        );
        const mapped: JobContent[] = filtered.flatMap((i) =>
          parseCareerContent(i.newsContent),
        );
        setJobOpenings(mapped);
      } catch (error) {
        console.error("fetch career error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCareer();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 animate-pulse">
        <div className="h-12 w-64 bg-slate-100 rounded-2xl mb-12 mx-auto md:mx-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-[500px] bg-slate-50 rounded-[3rem] border border-slate-100"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center md:text-left mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {currentLang === "th" ? "ร่วมงานกับเรา" : "Join Our Team"}
          </h1>
          <div className="h-1.5 w-20 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          <p className="text-slate-500 text-lg max-w-2xl">
            {currentLang === "th"
              ? "ค้นหาโอกาสในการเติบโตและสร้างความสำเร็จไปพร้อมกับครอบครัวเอเวอร์สปริง"
              : "Explore opportunities to grow and achieve success together with the Everspring family."}
          </p>
        </div>

        {jobOpenings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {jobOpenings.map((job, index) => {
              const jobTitle = job?.jobTitle?.[currentLang] ?? "";
              const province = job?.location?.province?.[currentLang] ?? "";
              const district = job?.location?.district?.[currentLang] ?? "";
              const jobType = job?.jobType?.[currentLang] ?? "";
              const salary = job?.salary?.[currentLang] ?? "";
              const workDays = job?.workingHours?.days?.[currentLang] ?? "";
              const workTime = job?.workingHours?.time?.[currentLang] ?? "";
              const workNote = job?.workingHours?.note?.[currentLang] ?? "";

              const gender = job?.requirements?.gender?.[currentLang] ?? "";
              const age = job?.requirements?.age?.[currentLang] ?? "";
              const education =
                job?.requirements?.education?.[currentLang] ?? "";
              const experience =
                job?.requirements?.experience?.[currentLang] ?? "";
              const additionalQualifications =
                job?.requirements?.additionalQualifications?.[currentLang] ??
                [];
              const responsibilities =
                job?.responsibilities?.[currentLang] ?? [];
              const benefits = job?.benefits?.[currentLang] ?? [];

              const mailBody = `${currentLang === "th" ? "สมัครตำแหน่ง" : "Applying for"}: ${jobTitle}\n\n${
                currentLang === "th"
                  ? "กรุณาแนบเอกสาร:\n1. CV / ประวัติย่อ\n2. Cover Letter\n3. เอกสารอื่นที่เกี่ยวข้อง"
                  : "Please attach:\n1. CV / Resume\n2. Cover Letter\n3. Relevant documents"
              }`;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                      <Briefcase className="w-3.5 h-3.5" />
                      {jobType}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                      {jobTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">
                        {[province, district].filter(Boolean).join(", ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                        <CircleDollarSign className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">{salary}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">{workDays}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{workTime}</span>
                        {workNote && (
                          <span className="text-[10px] text-slate-400">
                            {workNote}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 flex-grow">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {currentLang === "th"
                          ? "คุณสมบัติผู้สมัคร"
                          : "Job Requirements"}
                      </h3>
                      <ul className="grid grid-cols-1 gap-3 text-sm text-slate-600">
                        <li className="flex items-center gap-3">
                          <User className="w-4 h-4 text-slate-300" />{" "}
                          <strong>
                            {currentLang === "th" ? "เพศ:" : "Gender:"}
                          </strong>{" "}
                          {gender}
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-slate-300" />{" "}
                          <strong>
                            {currentLang === "th" ? "อายุ:" : "Age:"}
                          </strong>{" "}
                          {age}
                        </li>
                        <li className="flex items-center gap-3">
                          <GraduationCap className="w-4 h-4 text-slate-300" />{" "}
                          <strong>
                            {currentLang === "th" ? "การศึกษา:" : "Education:"}
                          </strong>{" "}
                          {education}
                        </li>
                        <li className="flex items-center gap-3">
                          <Award className="w-4 h-4 text-slate-300" />{" "}
                          <strong>
                            {currentLang === "th"
                              ? "ประสบการณ์:"
                              : "Experience:"}
                          </strong>{" "}
                          {experience}
                        </li>
                        {additionalQualifications.map((q, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 pl-7 italic text-slate-500 border-l-2 border-slate-50"
                          >
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {!!responsibilities.length && (
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          {currentLang === "th"
                            ? "หน้าที่รับผิดชอบ"
                            : "Responsibilities"}
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600 ml-1">
                          {responsibilities.map((r, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 group/item"
                            >
                              <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 group-hover/item:translate-x-1 transition-transform" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!!benefits.length && (
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          {currentLang === "th" ? "สวัสดิการ" : "Benefits"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {benefits.map((b, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 border border-slate-100"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-12">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&to=bandit.t@everspring.co.th&su=${encodeURIComponent(jobTitle)}&body=${encodeURIComponent(mailBody)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-blue-200"
                    >
                      <Mail className="w-5 h-5" />
                      <span>
                        {currentLang === "th"
                          ? "สมัครงานตำแหน่งนี้"
                          : "Apply via Email"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-xl font-medium">
              {currentLang === "th"
                ? "ยังไม่มีตำแหน่งงานว่างในขณะนี้"
                : "No job vacancies available at this moment."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
