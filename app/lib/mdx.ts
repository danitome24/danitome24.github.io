import fs from "fs";
import path from "path";
import { Metadata, Post } from "@/lib/types";

/**
 * Calculates estimated reading time at 200 words per minute speed.
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Parses the frontmatter from an MDX file and returns the metadata and content separately.
 */
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

/**
 * Reads the specified directory and returns an array of MDX file names (with .mdx extension).
 * @param dir
 * @returns
 */
function readFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Read an MDX file and extract its frontmatter metadata and content.
 */
function parseMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

/**
 * Reads all MDX files, extracts their metadata and content, and returns an array of Post objects.
 */
export function getMDXData(dir: string): Post[] {
  const mdxFiles = readFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = parseMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const readingTime = calculateReadingTime(content);

    return {
      metadata,
      slug,
      content,
      readingTime,
    };
  });
}
