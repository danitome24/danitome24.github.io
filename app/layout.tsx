import "./global.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { GeistMono } from "geist/font/mono";

const outfit = Outfit({ subsets: ["latin"] });
import { Navbar } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/footer";
import { baseUrl } from "@/app/sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Daniel Tomé",
    template: "%s | Daniel Tomé",
  },
  description:
    "Software engineer from Spain. Building backend systems, exploring Web3, and developing agentic AI solutions.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Daniel Tomé",
    description:
      "Software engineer from Spain. Building backend systems, exploring Web3, and developing agentic AI solutions.",
    url: baseUrl,
    siteName: "Daniel Tomé",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og?title=Daniel%20Tom%C3%A9&summary=Software%20engineer%20building%20backend%20systems%2C%20Web3%2C%20and%20agentic%20AI`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Tomé",
    description:
      "Software engineer from Spain. Building backend systems, exploring Web3, and developing agentic AI solutions.",
    images: [
      `${baseUrl}/og?title=Daniel%20Tom%C3%A9&summary=Software%20engineer%20building%20backend%20systems%2C%20Web3%2C%20and%20agentic%20AI`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        outfit.className,
        GeistMono.variable,
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
