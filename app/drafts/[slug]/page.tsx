import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getDraftPosts } from "@/app/blog/utils";
import { isDevelopment } from "@/app/lib/environment";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = getDraftPosts().find((post) => post.slug === slug);

  if (!post) {
    return Promise.resolve({
      title: "Draft not found",
      description: "The requested draft was not found.",
    });
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function DraftPreview({ params }: Props) {
  if (!isDevelopment()) {
    notFound();
  }

  const { slug } = await params;
  const post = getDraftPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <div className="mb-4 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded text-amber-800 dark:text-amber-300 text-sm font-mono inline-block">
        DRAFT — not published
      </div>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
