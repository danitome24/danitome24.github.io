import Link from "next/dist/client/link";

export default function About() {
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-xl md:text-4xl font-bold tracking-tight mb-4">
          About
        </h1>
      </div>

      <div className="space-y-4 text-lg leading-relaxed text-neutral-300">
        <p>
          I&apos;m Daniel Tomé, a software engineer from Spain. I build
          education platforms and backend systems that help organizations scale.
        </p>

        <p>
          I&apos;ve spent years working on large-scale education platforms. I
          build APIs, design systems, and solve infrastructure problems. I care
          about solutions that are clean, reliable, and actually work when you
          need them.
        </p>

        <p>
          Outside of my main work, I explore Web3 and blockchain. I&apos;m also
          learning about agentic AI, how autonomous systems can improve
          workflows and decision-making.
        </p>
        <p className="text-neutral-300">
          Reach out:{" "}
          <Link
            href="mailto:danieltomefer@gmail.com"
            className="underline hover:text-neutral-100 transition"
          >
            danieltomefer@gmail.com
          </Link>
        </p>
      </div>
    </section>
  );
}
