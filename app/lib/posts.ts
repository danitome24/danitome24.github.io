import fs from "fs";
import path from "path";
import { getMDXData } from "@/lib/mdx";
import { Post } from "@/lib/types";

/**
 * Sorts posts by publication date in descending order (newest first).
 */
function sortByPublicationDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt).getTime();
    const dateB = new Date(b.metadata.publishedAt).getTime();
    return dateB - dateA;
  });
}

/**
 * Retrieves all blog posts sorted by publication date (newest first).
 */
export function getBlogPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "app", "blog", "posts");
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  return sortByPublicationDate(getMDXData(postsDir));
}

/**
 * Retrieves all draft posts sorted by publication date (newest first).
 */
export function getDraftPosts(): Post[] {
  const draftsDir = path.join(process.cwd(), "app", "drafts", "posts");
  if (!fs.existsSync(draftsDir)) {
    return [];
  }
  return sortByPublicationDate(getMDXData(draftsDir));
}
