"use client";

import Link from "next/link";
import { useState } from "react";
import { formatDate } from "@/lib/date";
import { Post } from "@/lib/types";

export function BlogPosts({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(posts.map((p) => p.metadata.category))
  ).sort();

  const filtered = activeCategory
    ? posts.filter((p) => p.metadata.category === activeCategory)
    : posts;

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setActiveCategory((prev) =>
                prev === category ? null : category
              )
            }
            className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
              activeCategory === category
                ? "bg-neutral-800 text-neutral-100 border-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 dark:border-neutral-200"
                : "border-neutral-300 text-neutral-500 hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500"
            }`}
          >
            {category}
          </button>
        ))}
        {activeCategory && (
          <button
            onClick={() => setActiveCategory(null)}
            className="text-xs px-2 py-0.5 rounded-full border border-dashed border-neutral-300 text-neutral-400 hover:border-neutral-500 dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors"
          >
            clear
          </button>
        )}
      </div>

      {filtered.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4 transition-transform duration-200 hover:translate-x-1"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 items-baseline">
            <p className="text-neutral-600 dark:text-neutral-400 w-[120px] tabular-nums whitespace-nowrap">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
            <span
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory((prev) =>
                  prev === post.metadata.category ? null : post.metadata.category
                );
              }}
              className="text-xs px-2 py-0.5 rounded-full border border-neutral-300 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors cursor-pointer whitespace-nowrap"
            >
              {post.metadata.category}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
