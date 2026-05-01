import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Daniel Tomé's Post";
  const summary = url.searchParams.get("summary") || "";

  return new ImageResponse(
    <div
      tw="flex flex-col w-full h-full bg-white px-12 py-16 justify-between"
      style={{ fontFamily: "Outfit" }}
    >
      <div tw="flex flex-col flex-1 justify-center">
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
    {
      width: 1200,
      height: 630,
    },
  );
}
