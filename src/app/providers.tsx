"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CursorId } from "@/lib/cursor";
import { CURSORS, cursorBodyClass } from "@/lib/cursor";

type UiState = {
  armoryOpen: boolean;
  setArmoryOpen: (open: boolean) => void;
  cursor: CursorId;
  setCursor: (cursor: CursorId) => void;
};

const UiStateContext = createContext<UiState | null>(null);

const STORAGE_KEY = "cs16wiki_cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  const [armoryOpen, setArmoryOpen] = useState(false);
  const [cursor, setCursor] = useState<CursorId>(() => {
    if (typeof window === "undefined") return "knife";
    const saved = window.localStorage.getItem(STORAGE_KEY) as CursorId | null;
    if (saved && CURSORS.some((c) => c.id === saved)) return saved;
    return "knife";
  });

  useEffect(() => {
    const cls = cursorBodyClass(cursor);
    const all = CURSORS.map((c) => cursorBodyClass(c.id));
    document.body.classList.remove(...all);
    document.body.classList.add(cls);
    window.localStorage.setItem(STORAGE_KEY, cursor);
  }, [cursor]);

  const value = useMemo<UiState>(
    () => ({ armoryOpen, setArmoryOpen, cursor, setCursor }),
    [armoryOpen, cursor],
  );

  return <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>;
}

export function useUiState() {
  const ctx = useContext(UiStateContext);
  if (!ctx) throw new Error("useUiState must be used within Providers");
  return ctx;
}

