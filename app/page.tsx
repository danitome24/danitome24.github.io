import { BlogPosts } from "@/app/components/posts";
import Link from "next/link";

export default function Page() {
  return (
    <section className="space-y-10">
      <div>
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

      <div className="space-y-2 text-lg leading-relaxed">
        <p className="text-neutral-300">
          I build consumer software at the intersection of social and crypto.
        </p>

        <p className="text-neutral-300">
          Creator of{" "}
          <Link
            href="#"
            className="underline hover:text-neutral-100 transition"
          >
            Hey.xyz
          </Link>
          . Previously shipped at{" "}
          <Link
            href="#"
            className="underline hover:text-neutral-100 transition"
          >
            Lens
          </Link>{" "}
          (at{" "}
          <Link
            href="#"
            className="underline hover:text-neutral-100 transition"
          >
            Avara
          </Link>
          ),{" "}
          <Link
            href="#"
            className="underline hover:text-neutral-100 transition"
          >
            CRED
          </Link>
          , and{" "}
          <Link
            href="#"
            className="underline hover:text-neutral-100 transition"
          >
            Deloitte
          </Link>
          .
        </p>

        <p className="text-neutral-300">
          Lately, I&apos;ve been focused on products that feel personal,
          contextual, and a little bit magical.
        </p>

        <p className="text-neutral-300">
          Say hi at <span className="font-semibold">yoginth@hey.com</span>.
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
