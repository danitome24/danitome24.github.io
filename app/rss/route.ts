import { baseUrl } from "@/app/sitemap";
import { getBlogPosts } from "@/lib/posts";

export const revalidate = 3600;

export async function GET() {
  const allPosts = getBlogPosts();

  const itemsXml = allPosts
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt,
          ).toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Daniel Tomé's Blog</title>
        <link>${baseUrl}</link>
        <description>Thoughts on software engineering, backend systems, Web3, and agentic AI</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
