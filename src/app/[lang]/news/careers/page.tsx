// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { ThemeContext } from "@app/context/theme-context";
// import {
//   MapPin,
//   Briefcase,
//   CircleDollarSign,
//   Clock,
//   User,
//   GraduationCap,
//   Mail,
//   ChevronRight,
//   CheckCircle2,
//   CalendarDays,
//   Award,
// } from "lucide-react";
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
//   if (Array.isArray(content)) return content as JobContent[];
//   if (typeof content === "string") {
//     try {
//       const parsed = JSON.parse(content);
//       if (Array.isArray(parsed)) return parsed as JobContent[];
//       if (parsed && typeof parsed === "object") return [parsed as JobContent];
//       return [];
//     } catch {
//       return [];
//     }
//   }
//   if (typeof content === "object") return [content as JobContent];
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
//     return (
//       <div className="max-w-6xl mx-auto px-6 py-24 animate-pulse">
//         <div className="h-12 w-64 bg-slate-100 rounded-2xl mb-12 mx-auto md:mx-0"></div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {[1, 2].map((i) => (
//             <div
//               key={i}
//               className="h-[500px] bg-slate-50 rounded-[3rem] border border-slate-100"
//             ></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-[60vh] bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center md:text-left mb-16 space-y-4">
//           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
//             {currentLang === "th" ? "ร่วมงานกับเรา" : "Join Our Team"}
//           </h1>
//           <div className="h-1.5 w-20 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
//           <p className="text-slate-500 text-lg max-w-2xl">
//             {currentLang === "th"
//               ? "ค้นหาโอกาสในการเติบโตและสร้างความสำเร็จไปพร้อมกับครอบครัวเอเวอร์สปริง"
//               : "Explore opportunities to grow and achieve success together with the Everspring family."}
//           </p>
//         </div>

//         {jobOpenings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
//             {jobOpenings.map((job, index) => {
//               const jobTitle = job?.jobTitle?.[currentLang] ?? "";
//               const province = job?.location?.province?.[currentLang] ?? "";
//               const district = job?.location?.district?.[currentLang] ?? "";
//               const jobType = job?.jobType?.[currentLang] ?? "";
//               const salary = job?.salary?.[currentLang] ?? "";
//               const workDays = job?.workingHours?.days?.[currentLang] ?? "";
//               const workTime = job?.workingHours?.time?.[currentLang] ?? "";
//               const workNote = job?.workingHours?.note?.[currentLang] ?? "";

//               const gender = job?.requirements?.gender?.[currentLang] ?? "";
//               const age = job?.requirements?.age?.[currentLang] ?? "";
//               const education =
//                 job?.requirements?.education?.[currentLang] ?? "";
//               const experience =
//                 job?.requirements?.experience?.[currentLang] ?? "";
//               const additionalQualifications =
//                 job?.requirements?.additionalQualifications?.[currentLang] ??
//                 [];
//               const responsibilities =
//                 job?.responsibilities?.[currentLang] ?? [];
//               const benefits = job?.benefits?.[currentLang] ?? [];

//               const mailBody = `${currentLang === "th" ? "สมัครตำแหน่ง" : "Applying for"}: ${jobTitle}\n\n${
//                 currentLang === "th"
//                   ? "กรุณาแนบเอกสาร:\n1. CV / ประวัติย่อ\n2. Cover Letter\n3. เอกสารอื่นที่เกี่ยวข้อง"
//                   : "Please attach:\n1. CV / Resume\n2. Cover Letter\n3. Relevant documents"
//               }`;

//               return (
//                 <div
//                   key={index}
//                   className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
//                 >
//                   <div className="mb-8">
//                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
//                       <Briefcase className="w-3.5 h-3.5" />
//                       {jobType}
//                     </div>
//                     <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
//                       {jobTitle}
//                     </h2>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
//                     <div className="flex items-center gap-3 text-slate-600">
//                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
//                         <MapPin className="w-5 h-5" />
//                       </div>
//                       <span className="text-sm font-medium">
//                         {[province, district].filter(Boolean).join(", ")}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3 text-slate-600">
//                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
//                         <CircleDollarSign className="w-5 h-5" />
//                       </div>
//                       <span className="text-sm font-medium">{salary}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-slate-600">
//                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
//                         <CalendarDays className="w-5 h-5" />
//                       </div>
//                       <span className="text-sm font-medium">{workDays}</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-slate-600">
//                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
//                         <Clock className="w-5 h-5" />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="text-sm font-medium">{workTime}</span>
//                         {workNote && (
//                           <span className="text-[10px] text-slate-400">
//                             {workNote}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-8 flex-grow">
//                     <div>
//                       <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//                         {currentLang === "th"
//                           ? "คุณสมบัติผู้สมัคร"
//                           : "Job Requirements"}
//                       </h3>
//                       <ul className="grid grid-cols-1 gap-3 text-sm text-slate-600">
//                         <li className="flex items-center gap-3">
//                           <User className="w-4 h-4 text-slate-300" />{" "}
//                           <strong>
//                             {currentLang === "th" ? "เพศ:" : "Gender:"}
//                           </strong>{" "}
//                           {gender}
//                         </li>
//                         <li className="flex items-center gap-3">
//                           <CheckCircle2 className="w-4 h-4 text-slate-300" />{" "}
//                           <strong>
//                             {currentLang === "th" ? "อายุ:" : "Age:"}
//                           </strong>{" "}
//                           {age}
//                         </li>
//                         <li className="flex items-center gap-3">
//                           <GraduationCap className="w-4 h-4 text-slate-300" />{" "}
//                           <strong>
//                             {currentLang === "th" ? "การศึกษา:" : "Education:"}
//                           </strong>{" "}
//                           {education}
//                         </li>
//                         <li className="flex items-center gap-3">
//                           <Award className="w-4 h-4 text-slate-300" />{" "}
//                           <strong>
//                             {currentLang === "th"
//                               ? "ประสบการณ์:"
//                               : "Experience:"}
//                           </strong>{" "}
//                           {experience}
//                         </li>
//                         {additionalQualifications.map((q, i) => (
//                           <li
//                             key={i}
//                             className="flex items-start gap-3 pl-7 italic text-slate-500 border-l-2 border-slate-50"
//                           >
//                             {q}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {!!responsibilities.length && (
//                       <div>
//                         <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
//                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//                           {currentLang === "th"
//                             ? "หน้าที่รับผิดชอบ"
//                             : "Responsibilities"}
//                         </h4>
//                         <ul className="space-y-2 text-sm text-slate-600 ml-1">
//                           {responsibilities.map((r, i) => (
//                             <li
//                               key={i}
//                               className="flex items-start gap-3 group/item"
//                             >
//                               <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 group-hover/item:translate-x-1 transition-transform" />
//                               <span>{r}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {!!benefits.length && (
//                       <div>
//                         <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
//                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
//                           {currentLang === "th" ? "สวัสดิการ" : "Benefits"}
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                           {benefits.map((b, i) => (
//                             <span
//                               key={i}
//                               className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 border border-slate-100"
//                             >
//                               {b}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-12">
//                     <a
//                       href={`https://mail.google.com/mail/?view=cm&to=bandit.t@everspring.co.th&su=${encodeURIComponent(jobTitle)}&body=${encodeURIComponent(mailBody)}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-full inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-blue-200"
//                     >
//                       <Mail className="w-5 h-5" />
//                       <span>
//                         {currentLang === "th"
//                           ? "สมัครงานตำแหน่งนี้"
//                           : "Apply via Email"}
//                       </span>
//                       <ChevronRight className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
//             <Briefcase className="w-16 h-16 text-slate-200 mx-auto mb-4" />
//             <p className="text-slate-400 text-xl font-medium">
//               {currentLang === "th"
//                 ? "ยังไม่มีตำแหน่งงานว่างในขณะนี้"
//                 : "No job vacancies available at this moment."}
//             </p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@app/context/theme-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  CircleDollarSign,
  Clock,
  User,
  GraduationCap,
  Mail,
  ChevronDown,
  CheckCircle2,
  CalendarDays,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { JobContent } from "@/types/jobcontent";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;


const JobRow = ({
  job,
  lang,
  isOpen,
  onClick,
}: {
  job: JobContent;
  lang: "th" | "en";
  isOpen: boolean;
  onClick: () => void;
}) => {
  const t = (th: string, en: string) => (lang === "th" ? th : en);

  const title = job?.jobTitle?.[lang] || "";
  const location = job?.location?.province?.[lang] || "";
  const type = job?.jobType?.[lang] || "";
  const salary = job?.salary?.[lang] || "";

  return (
    <div
      className={`border-b border-slate-100 last:border-0 transition-all duration-300 ${isOpen ? "bg-blue-50/30" : "hover:bg-slate-50/50"}`}
    >
      {/* Clickable Header Area */}
      <div
        onClick={onClick}
        className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 cursor-pointer group"
      >
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-600 uppercase tracking-wider">
              {type}
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-xs">
              <MapPin className="w-3 h-3" /> {location}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="hidden lg:block text-right">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
              {t("เงินเดือน", "Salary")}
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {salary || t("ตามตกลง", "Negotiable")}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-500 ${isOpen ? "rotate-180 bg-blue-600 border-blue-600 text-white" : "text-slate-400"}`}
          >
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Requirements */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-5 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />{" "}
                    {t("คุณสมบัติผู้สมัคร", "Requirements")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    <ReqItem
                      icon={User}
                      label={t("เพศ", "Gender")}
                      value={job?.requirements?.gender?.[lang]}
                    />
                    <ReqItem
                      icon={CheckCircle2}
                      label={t("อายุ", "Age")}
                      value={job?.requirements?.age?.[lang]}
                    />
                    <ReqItem
                      icon={GraduationCap}
                      label={t("การศึกษา", "Education")}
                      value={job?.requirements?.education?.[lang]}
                    />
                    <ReqItem
                      icon={Award}
                      label={t("ประสบการณ์", "Experience")}
                      value={job?.requirements?.experience?.[lang]}
                    />
                  </div>
                </div>

                {job?.responsibilities?.[lang]?.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-5">
                      {t("หน้าที่รับผิดชอบ", "Responsibilities")}
                    </h4>
                    <ul className="space-y-3">
                      {job.responsibilities[lang].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Actions & Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />{" "}
                      {t("วันทำงาน", "Days")}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {job?.workingHours?.days?.[lang]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {t("เวลา", "Time")}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {job?.workingHours?.time?.[lang]}
                    </span>
                  </div>

                  {/* Modern Apply Button */}
                  <a
                    href={`mailto:bandit.t@everspring.co.th?subject=สมัครงานตำแหน่ง ${title}`}
                    className="group relative flex items-center justify-center gap-3 w-full py-4 mt-4 bg-blue-600 text-white rounded-xl font-bold transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.3)] overflow-hidden"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000" />
                    <Mail className="w-4 h-4" />
                    {t("ส่งใบสมัครเมลนี้", "Apply via Email")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ReqItem = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-700">{value || "—"}</span>
    </div>
  </div>
);

// --- Main Page ---

export default function Career() {
  const { lang } = useContext(ThemeContext);
  const currentLang = (lang === "en" ? "en" : "th") as "en" | "th";

  const [jobOpenings, setJobOpenings] = useState<JobContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // เปิดตำแหน่งแรกไว้เป็น Default

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data = await res.json();
        const mapped = (data || [])
          .filter((i: any) => i.isEvents === 3 && i.isEnabled === false)
          .flatMap((i: any) => {
            try {
              return typeof i.newsContent === "string"
                ? JSON.parse(i.newsContent)
                : i.newsContent;
            } catch {
              return [];
            }
          });
        setJobOpenings(Array.isArray(mapped) ? mapped : [mapped]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header: เรียบหรูขึ้น */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Career <span className="text-blue-600">Opportunities</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            {currentLang === "th"
              ? "ร่วมเป็นส่วนหนึ่งในทีมงานมืออาชีพและเติบโตไปพร้อมกับเรา"
              : "Join our professional team and grow together with Everspring."}
          </p>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-white rounded-3xl border border-slate-100"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            {jobOpenings.length > 0 ? (
              jobOpenings.map((job, index) => (
                <JobRow
                  key={index}
                  job={job}
                  lang={currentLang}
                  isOpen={openIndex === index}
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))
            ) : (
              <div className="p-20 text-center text-slate-400 italic">
                No open positions at the moment.
              </div>
            )}
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-slate-400">
          {currentLang === "th"
            ? "ไม่พบตำแหน่งที่ต้องการ? ส่ง CV ของคุณมาได้ที่ bandit.t@everspring.co.th"
            : "Didn't find what you're looking for? Send your CV to bandit.t@everspring.co.th"}
        </div>
      </div>
    </main>
  );
}
