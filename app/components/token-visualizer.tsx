"use client";

import { useState } from "react";

const COLORS = [
  {
    bg: "bg-blue-100 dark:bg-blue-950",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-300 dark:border-blue-700",
  },
  {
    bg: "bg-orange-100 dark:bg-orange-950",
    text: "text-orange-800 dark:text-orange-200",
    border: "border-orange-300 dark:border-orange-700",
  },
  {
    bg: "bg-emerald-100 dark:bg-emerald-950",
    text: "text-emerald-800 dark:text-emerald-200",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  {
    bg: "bg-purple-100 dark:bg-purple-950",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-300 dark:border-purple-700",
  },
  {
    bg: "bg-amber-100 dark:bg-amber-950",
    text: "text-amber-800 dark:text-amber-200",
    border: "border-amber-300 dark:border-amber-700",
  },
];

const DEFAULT_TEXT = "Los modelos de lenguaje son fascinantes";

function naiveTokenize(text: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/[.,!?;:()\[\]{}"'¿¡]/.test(ch)) {
      tokens.push(ch);
      i++;
    } else if (/\s/.test(ch)) {
      let j = i + 1;
      while (j < text.length && !/[\s.,!?;:()\[\]{}"'¿¡]/.test(text[j])) j++;
      const word = text.slice(i, j);
      if (word.trim().length === 0) {
        i = j;
        continue;
      }
      splitWord(word, tokens);
      i = j;
    } else {
      let j = i;
      while (j < text.length && !/[\s.,!?;:()\[\]{}"'¿¡]/.test(text[j])) j++;
      const word = text.slice(i, j);
      splitWord(word, tokens);
      i = j;
    }
  }
  return tokens.filter((t) => t.length > 0);
}

function splitWord(word: string, tokens: string[]) {
  const w = word.trimStart();
  const prefix =
    word.length - w.length > 0 ? word.slice(0, word.length - w.length) : "";
  if (w.length <= 5) {
    tokens.push(prefix + w);
  } else if (w.length <= 9) {
    const mid = Math.ceil(w.length * 0.55);
    tokens.push(prefix + w.slice(0, mid));
    tokens.push(w.slice(mid));
  } else {
    const a = Math.floor(w.length / 3);
    const b = Math.floor((w.length * 2) / 3);
    tokens.push(prefix + w.slice(0, a));
    tokens.push(w.slice(a, b));
    tokens.push(w.slice(b));
  }
}

export default function TokenVisualizer() {
  const [input, setInput] = useState(DEFAULT_TEXT);
  const [tokens, setTokens] = useState<string[]>(() =>
    naiveTokenize(DEFAULT_TEXT),
  );

  const handleTokenize = () => {
    setTokens(naiveTokenize(input));
  };

  return (
    <div className="my-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5 not-prose">
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
        Escribe una frase y mira cómo la divide el modelo:
      </p>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTokenize()}
          className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          placeholder="Escribe algo..."
        />
        <button
          onClick={handleTokenize}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
        >
          Tokenizar ↗
        </button>
      </div>

      {/* Tokens */}
      <div className="flex flex-wrap gap-1.5 min-h-10 mb-3">
        {tokens.map((token, i) => {
          const c = COLORS[i % COLORS.length];
          return (
            <span
              key={i}
              className={`inline-flex items-center px-2 py-1 rounded-md border font-mono text-xs ${c.bg} ${c.text} ${c.border}`}
              title={`Token ${i + 1}`}
            >
              {token.replace(/ /g, "·")}
            </span>
          );
        })}
      </div>

      {/* Stats */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          {tokens.length}
        </span>{" "}
        tokens
        {" · "}cada token cuenta para el límite de contexto y el coste de API
      </p>

      {/* Disclaimer */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700 pt-3">
        <span className="text-zinc-600 dark:text-zinc-300 font-semibold">
          Disclaimer:
        </span>{" "}
        Este tokenizer es una simulación simplificada y no divide el texto como
        los LLMs reales lo hacen. Consulta https://gpt-tokenizer.dev/ para una
        tokenización más precisa.
      </p>
    </div>
  );
}
