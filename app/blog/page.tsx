import { BlogPosts } from "@/app/components/posts";
import { isDevelopment } from "@/app/lib/environment";
import { DraftPosts } from "@/components/drafts";

export const metadata = {
  title: "Daniel Tome's Blog",
  description: "My thoughts on software engineering, AI, and more.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />

      {isDevelopment() && (
        <div className="mt-12 pt-8 border-t border-dashed border-neutral-300 dark:border-neutral-700">
          <p className="text-sm font-mono uppercase text-neutral-500 dark:text-neutral-500 mb-4">
            Drafts (dev only)
          </p>
          <DraftPosts />
        </div>
      )}
    </section>
  );
}
