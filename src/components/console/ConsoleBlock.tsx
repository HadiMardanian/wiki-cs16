"use client";

import React, { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

export function ConsoleBlock({
  title = "The Config",
  commands,
}: {
  title?: string;
  commands: string | string[];
}) {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => {
    const raw = Array.isArray(commands) ? commands : commands.split("\n");
    return raw.map((l) => l.trim()).filter(Boolean);
  }, [commands]);

  const copyText = lines.join("\n");
  const displayText = lines.map((l) => `] ${l}`).join("\n");

  return (
    <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)]">
      <div className="flex items-center justify-between gap-3 border-b border-[color:var(--cs-green-dim)] px-3 py-2">
        <div className="text-[12px] text-[color:var(--cs-menu-active)]">{title}</div>
        <button
          type="button"
          className="cs-ui-button px-2 py-1 text-[12px]"
          onClick={async () => {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 900);
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <pre className="overflow-x-auto px-3 py-3 text-[12px] leading-[1.65] text-[color:var(--cs-green)]">
        {displayText}
      </pre>
    </div>
  );
}

