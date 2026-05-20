export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category: string;
  image?: string;
};

export type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
  readingTime: number;
};
