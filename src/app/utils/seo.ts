interface MetadataProps {
  title: string;
  description: string;
  keywords?: string;
}

export function generateMetadata({ title, description, keywords }: MetadataProps) {
  return {
    title,
    description,
    keywords
  };
}
