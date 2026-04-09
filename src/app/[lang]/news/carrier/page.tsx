"use client";

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@app/context/theme-context";
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

  if (Array.isArray(content)) {
    return content as JobContent[];
  }

  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);

      if (Array.isArray(parsed)) {
        return parsed as JobContent[];
      }

      if (parsed && typeof parsed === "object") {
        return [parsed as JobContent];
      }

      return [];
    } catch {
      return [];
    }
  }

  if (typeof content === "object") {
    return [content as JobContent];
  }

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
    return <div className="text-sm text-gray-500">กำลังโหลดข้อมูล…</div>;
  }

  if (!jobOpenings.length) return null;

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-800">
        {currentLang === "th" ? "ตำแหน่งงานว่าง" : "Job Vacancies"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          const education = job?.requirements?.education?.[currentLang] ?? "";
          const experience = job?.requirements?.experience?.[currentLang] ?? "";
          const additionalQualifications =
            job?.requirements?.additionalQualifications?.[currentLang] ?? [];
          const responsibilities = job?.responsibilities?.[currentLang] ?? [];
          const benefits = job?.benefits?.[currentLang] ?? [];

          return (
            <React.Fragment key={index}>
              <div className="p-6 bg-white border border-gray-200 rounded-xl flex flex-col">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  {jobTitle}
                </h2>

                <p className="text-sm text-gray-600 mb-2">
                  📍 {[province, district].filter(Boolean).join(", ")} · ⏱{" "}
                  {jobType}
                </p>

                <p className="text-sm text-gray-600 mb-2">💰 {salary}</p>

                <div className="mt-2 mb-4 space-y-2">
                  <p className="text-sm text-gray-700">
                    🕒 {workDays} | {workTime}
                  </p>

                  {workNote && (
                    <p className="text-xs text-gray-500">{workNote}</p>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="font-medium mb-1">
                    {currentLang === "th" ? "คุณสมบัติ" : "Requirements"}
                  </h3>

                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>
                      {currentLang === "th" ? "เพศ" : "Gender"}: {gender}
                    </li>
                    <li>
                      {currentLang === "th" ? "อายุ" : "Age"}: {age}
                    </li>
                    <li>
                      {currentLang === "th" ? "การศึกษา" : "Education"}:{" "}
                      {education}
                    </li>
                    <li>
                      {currentLang === "th" ? "ประสบการณ์" : "Experience"}:{" "}
                      {experience}
                    </li>

                    {additionalQualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>

                {!!responsibilities.length && (
                  <div className="mb-4">
                    <h3 className="font-medium mb-1">
                      {currentLang === "th"
                        ? "หน้าที่รับผิดชอบ"
                        : "Responsibilities"}
                    </h3>

                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-medium mb-1">
                    {currentLang === "th" ? "สวัสดิการ" : "Benefits"}
                  </h3>

                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://mail.google.com/mail/?view=cm&to=bandit.t@everspring.co.th&su=${encodeURIComponent(
                    jobTitle,
                  )}&body=${encodeURIComponent(
                    `${
                      currentLang === "th" ? "สมัครตำแหน่ง" : "Applying for"
                    }: ${jobTitle}

                    ${
                      currentLang === "th"
                        ? `กรุณาแนบเอกสาร:
                        1. CV / ประวัติย่อ
                        2. Cover Letter
                        3. เอกสารอื่น (ถ้ามี)
                        ขอบคุณค่ะ`
                        : `Please attach:
                        1. CV / Resume
                        2. Cover Letter
                        3. Other supporting documents (if any)

                        Thank you.`
                    }`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:underline mt-auto"
                >
                  ✉ {currentLang === "th" ? "สมัครตำแหน่งนี้" : "Apply"} →
                </a>
              </div>

              {(index === 2 || index === 5) && (
                <div className="col-span-full border-t border-gray-200 my-4" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}
