import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { baseUrl } from "@/app/sitemap";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";
import { Post } from "@/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts: Post[] = getBlogPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return Promise.resolve({
      title: "Post not found",
      description: "The requested post was not found.",
    });
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}&summary=${encodeURIComponent(post.metadata.summary)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Daniel Tomé",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.readingTime} min read
          </p>
          <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
            {post.metadata.category}
          </span>
        </div>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
