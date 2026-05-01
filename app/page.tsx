import { BlogPosts } from "@/app/components/posts";
import Link from "next/link";

export default function Page() {
  return (
    <section className="space-y-11">
      <div className="space-y-2">
        <h1 className="text-xl md:text-4xl font-bold tracking-tight">
          Hey, I&apos;m Dani.
        </h1>
        <p className="text-lg text-neutral-400">
          Software Engineer @{" "}
          <Link
            href="https://www.urv.cat"
            className="underline hover:text-neutral-100 transition"
            target="_blank"
          >
            URV
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-neutral-300">
          Experience with large-scale education platforms and API
          infrastructure. Passionate about leveraging AI to increase
          productivity.
        </p>

        <p className="text-neutral-300">
          Naturally curious and self-driven to learn and explore new
          technologies.
        </p>

        <p className="text-neutral-300">
          Exploring Web3 and Agentic Development in my spare time.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-neutral-400 text-sm uppercase tracking-wide">
          Writing
        </h2>
        <div className="space-y-4">
          <BlogPosts />
        </div>
      </div>
    </section>
  );
}
