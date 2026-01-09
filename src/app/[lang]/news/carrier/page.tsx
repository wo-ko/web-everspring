"use client";

import React from "react";
import { ThemeContext } from "@app/context/theme-context";
import { useContext, useEffect, useState } from "react";

import type { EventCareerItem, JobContent } from "@/types/jobcontent";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/news`;

export default function Career() {
  const { lang } = useContext(ThemeContext);

  const [jobOpenings, setJobOpenings] = useState<JobContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCareer() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });

        const data = (await res.json()) as EventCareerItem[];

        const filtered = (data ?? []).filter(
          (i) => i.isEvents === 3 && i.isEnabled === false
        );

        const mapped: JobContent[] = filtered.map((i) => {
          return i.newsContent as any;
        });

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
        {lang === "th" ? "ตำแหน่งงานว่าง" : "Job Vacancies"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobOpenings.map((job, index) => (
          <React.Fragment key={index}>
            <div className="p-6 bg-white border border-gray-200 rounded-xl flex flex-col">
              {/* Job title */}
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {job.jobTitle[lang as "th" | "en"]}
              </h2>

              {/* Location and type */}
              <p className="text-sm text-gray-600 mb-2">
                📍 {job.location.province[lang as "th" | "en"]} · ⏱{" "}
                {job.jobType[lang as "th" | "en"]}
              </p>

              {/* Salary */}
              <p className="text-sm text-gray-600 mb-2">
                💰 {job.salary[lang as "th" | "en"]}
              </p>

              {/* Working hours */}
              <div className="mt-2 mb-4 space-y-2">
                <p className="text-sm text-gray-700">
                  🕒 {job.workingHours.days[lang as "th" | "en"]} |{" "}
                  {job.workingHours.time[lang as "th" | "en"]}
                </p>

                <p className="text-xs text-gray-500">
                  {job.workingHours.note?.[lang as "th" | "en"]}
                </p>
              </div>

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

                  {/* Additional qualifications */}
                  {job.requirements.additionalQualifications[
                    lang as "th" | "en"
                  ]?.map((q, i) => (
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
                  {job.benefits[lang as "th" | "en"]?.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {/* Apply Gmail */}
              <a
                href={`https://mail.google.com/mail/?view=cm&to=bandit.t@everspring.co.th&su=${encodeURIComponent(
                  job.jobTitle[lang as "th" | "en"]
                )}&body=${encodeURIComponent(
                  `สมัครตำแหน่ง: ${job.jobTitle.th}

กรุณาแนบเอกสาร:
1. CV / ประวัติย่อ
2. Cover Letter
3. เอกสารอื่น (ถ้ามี)

ขอบคุณค่ะ`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:underline mt-auto"
              >
                ✉ {lang === "th" ? "สมัครตำแหน่งนี้" : "Apply"} →
              </a>
            </div>

            {/* Divider เต็มแถว */}
            {(index === 2 || index === 5) && (
              <div className="col-span-full border-t border-gray-200 my-4"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}
