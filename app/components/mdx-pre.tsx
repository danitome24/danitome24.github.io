"use client";

import React, { useState } from "react";

export function PreClient(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >,
) {
  const [copied, setCopied] = useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);
  const { children, ...rest } = props;

  const copyToClipboard = async () => {
    const text = preRef.current?.textContent || "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre ref={preRef} {...rest}>
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 px-3 py-1 rounded bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        title="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
