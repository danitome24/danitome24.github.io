import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { baseUrl } from "@/app/sitemap";
import { isDevelopment } from "@/lib/environment";
import { getDraftPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getDraftPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Drafts({ params }: Props) {
  const { slug } = await params;
  const post = getDraftPosts().find((post) => post.slug === slug);

  if (!isDevelopment()) {
    notFound();
  }

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
        <div className="flex gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {post.readingTime} min read
          </p>
        </div>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
