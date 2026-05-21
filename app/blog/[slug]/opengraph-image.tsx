import { ImageResponse } from "next/og";
import { getBlogPosts } from "@/lib/posts";

export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);

  const title = post?.metadata.title ?? "Daniel Tomé's Blog";
  const summary = post?.metadata.summary ?? "";
  const category = post?.metadata.category ?? "";

  return new ImageResponse(
    <div
      tw="flex flex-col w-full h-full bg-white px-12 py-16 justify-between"
      style={{ fontFamily: "sans-serif" }}
    >
      <div tw="flex flex-col flex-1 justify-center">
        {category && (
          <span tw="text-sm font-medium text-blue-500 mb-4 uppercase tracking-widest">
            {category}
          </span>
        )}
        <h1 tw="text-5xl font-bold tracking-tight text-black mb-6 leading-tight">
          {title}
        </h1>
        {summary && (
          <p tw="text-xl text-gray-600 leading-relaxed max-w-2xl">{summary}</p>
        )}
      </div>
      <div tw="flex items-center justify-between border-t border-gray-200 pt-6">
        <span tw="text-lg text-black font-medium">Daniel Tomé</span>
        <div tw="w-2 h-2 bg-blue-400 rounded-full"></div>
      </div>
    </div>,
    size,
  );
}
