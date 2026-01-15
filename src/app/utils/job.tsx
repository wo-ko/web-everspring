import { JobContent } from "@/types/jobcontent";

export function createEmptyJob(): JobContent {
  return {
    jobTitle: { th: "", en: "" },
    jobType: { th: "", en: "" },
    numberOfPositions: 1,
    location: {
      province: { th: "", en: "" },
      district: { th: "", en: "" },
    },
    salary: { th: "", en: "" },
    workingHours: {
      days: { th: "", en: "" },
      time: { th: "", en: "" },
      note: { th: "", en: "" },
    },
    requirements: {
      gender: { th: "", en: "" },
      age: { th: "", en: "" },
      education: { th: "", en: "" },
      experience: { th: "", en: "" },
      additionalQualifications: { th: [], en: [] },
    },
    responsibilities: { th: [], en: [] },
    benefits: { th: [], en: [] },
  };
}
