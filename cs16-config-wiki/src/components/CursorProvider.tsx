"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CursorId = "knife" | "usp" | "ak47" | "awp";

export type CursorOption = {
  id: CursorId;
  label: string;
  bodyClass: `cursor-${CursorId}`;
  glyph: string;
};

export const CURSOR_OPTIONS: CursorOption[] = [
  { id: "knife", label: "Knife (Default)", bodyClass: "cursor-knife", glyph: "🔪" },
  { id: "usp", label: "USP", bodyClass: "cursor-usp", glyph: "🔫" },
  { id: "ak47", label: "AK47", bodyClass: "cursor-ak47", glyph: "🧨" },
  { id: "awp", label: "AWP", bodyClass: "cursor-awp", glyph: "🎯" },
];

type CursorContextValue = {
  active: CursorId;
  setActive: (id: CursorId) => void;
  options: CursorOption[];
};

const CursorContext = createContext<CursorContextValue | null>(null);

function getInitialCursor(): CursorId {
  if (typeof window === "undefined") return "knife";
  const stored = window.localStorage.getItem("cs16.cursor");
  if (stored === "knife" || stored === "usp" || stored === "ak47" || stored === "awp") return stored;
  return "knife";
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<CursorId>(() => getInitialCursor());

  useEffect(() => {
    const body = document.body;
    // Remove any existing cursor-* class, then apply the active one.
    for (const opt of CURSOR_OPTIONS) body.classList.remove(opt.bodyClass);
    const opt = CURSOR_OPTIONS.find((o) => o.id === active);
    if (opt) body.classList.add(opt.bodyClass);
    window.localStorage.setItem("cs16.cursor", active);
  }, [active]);

  const value = useMemo<CursorContextValue>(
    () => ({ active, setActive, options: CURSOR_OPTIONS }),
    [active],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}

