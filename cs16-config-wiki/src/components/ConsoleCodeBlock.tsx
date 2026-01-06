"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

export function ConsoleCodeBlock({
  title,
  lines,
}: {
  title?: string;
  lines: string[] | string;
}) {
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => (Array.isArray(lines) ? lines : [lines]), [lines]);
  const text = useMemo(() => normalized.join("\n"), [normalized]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // eslint-disable-next-line no-console
      console.log("[ui] copy_failed");
    }
  }, [text]);

  return (
    <div className="border border-[var(--cs-border)] bg-black/50">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--cs-border)] px-3 py-2">
        <div className="text-xs uppercase tracking-wider text-[var(--cs-green)]/75">
          {title ?? "The Config"}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={[
            "flex items-center gap-2 px-3 py-1.5 text-xs uppercase",
            "border border-[var(--cs-border)] bg-black/60",
            "text-[var(--cs-menu-hot)] hover:bg-black/80",
          ].join(" ")}
          aria-label="Copy commands"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto px-3 py-3 text-sm leading-6 text-[var(--cs-green)]">
        {normalized.map((line, idx) => (
          <div key={idx}>
            <span className="text-[var(--cs-green)]/75">] </span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

