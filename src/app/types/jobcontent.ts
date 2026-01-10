export type JobContent = {
  jobTitle: { th: string; en: string };
  jobType: { th: string; en: string };
  numberOfPositions: number;
  location: {
    province: { th: string; en: string };
    district: { th: string; en: string };
  };
  salary: { th: string; en: string };
  workingHours: {
    days: { th: string; en: string };
    time: { th: string; en: string };
    note?: { th: string; en: string };
  };
  requirements: {
    gender: { th: string; en: string };
    age: { th: string; en: string };
    education: { th: string; en: string };
    experience: { th: string; en: string };
    additionalQualifications: {
      th: string[];
      en: string[];
    };
  };
  responsibilities: {
    th: string[];
    en: string[];
  };
  benefits: {
    th: string[];
    en: string[];
  };
};

export const VALID_NEWS_TYPES = ["press", "events", "career"] as const;

export type NewsType = (typeof VALID_NEWS_TYPES)[number];

export function isNewsType(value: unknown): value is NewsType {
  return (
    typeof value === "string" &&
    (VALID_NEWS_TYPES as readonly string[]).includes(value)
  );
}
export type EventPressItem = {
  newsId: string;
  newsTitle: string;
  preview: string | null;
  imgUrl: string | null;

  isEnabled: boolean;
  isEvents: 1;

  publishedAt: string | null;
  expriedAt: string | null;

  createdAt: string | null;
  updatedAt: string | null;
};

export type EventNewsItem = {
  newsId: string;
  newsTitle: string;
  preview: string | null;
  newsContent?:
    | string
    | {
        images?: string[];
      };
  imgUrl: string | null;

  isEnabled: boolean;
  isEvents: 2;

  publishedAt: string | null;
  expriedAt: string | null;

  createdAt: string | null;
  updatedAt: string | null;
};

// สมัครงาน
export type EventCareerItem = {
  newsId: string;
  newsTitle: string;
  preview: string | null;
  newsContent: JobContent[];
  imgUrl: string | null;

  isEnabled: boolean;
  isEvents: 3;

  publishedAt: string | null;
  expriedAt: string | null;

  createdAt: string | null;
  updatedAt: string | null;
};

// ข่าวสาร
export type EventItem = {
  newsId: string;
  newsTitle: string;
  preview: string | null;
  newsContent?:
    | string
    | {
        images?: string[];
      };
  imgUrl: string | null;

  isEnabled: boolean;
  isEvents: 2;

  publishedAt: string | null;
  expriedAt: string | null;

  createdAt: string | null;
  updatedAt: string | null;
};

export type ActivityUI = {
  id: string;
  imageUrl: string;
  images?: string[];
  title: { th: string; en: string };
  description: { th: string; en: string };
  linkUrl?: string;
};

export type ActivtyCareerUI = {
  id: string;
  title: { th: string; en: string };
  location: { th: string; en: string };
  type: { th: string; en: string };
  salary: { th: string; en: string };
  workingHours: {
    day: { th: string; en: string };
    time: { th: string; en: string };
    note: { th: string; en: string };
  }[];
  requirements: {
    gender: { th: string; en: string };
    age: { th: string; en: string };
    education: { th: string; en: string };
    experience: { th: string; en: string };
    additionalQualifications: { th: string[]; en: string[] };
    benefits: { th: string[]; en: string[] };
    linkUrl?: string;
  };
};
