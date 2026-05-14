import Link from "next/link";
import { getBlogPosts } from "@/lib/posts";
import { formatDate } from "@/lib/date";

export function BlogPosts() {
  const posts = getBlogPosts();

  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4 transition-transform duration-200 hover:translate-x-1"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums whitespace-nowrap">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
