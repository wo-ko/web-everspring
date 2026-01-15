import NewsManager from "./NewsManager";

const VALID_TYPES = ["press", "events", "career"] as const;
type NewsType = (typeof VALID_TYPES)[number];

function isNewsType(value: unknown): value is NewsType {
  return typeof value === "string" && VALID_TYPES.includes(value as NewsType);
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const rawType = params?.type;
  const typeValue = Array.isArray(rawType) ? rawType[0] : rawType;

  const initialType: NewsType = isNewsType(typeValue) ? typeValue : "press";

  return <NewsManager initialType={initialType} />;
}
