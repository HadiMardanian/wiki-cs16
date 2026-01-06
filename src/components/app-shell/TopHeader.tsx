"use client";

import React from "react";
import { ShoppingBasket } from "lucide-react";
import { useUiState } from "@/app/providers";
import { CURSORS } from "@/lib/cursor";

export function TopHeader() {
  const { setArmoryOpen, cursor } = useUiState();
  const cursorLabel = CURSORS.find((c) => c.id === cursor)?.label ?? cursor;

  return (
    <header className="flex items-center justify-between border-b border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel-solid)] px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="font-[family:var(--font-cs-pixel)] text-[11px] text-[color:var(--cs-green)]">
          Counter-Strike 1.6 Configuration Wiki
        </div>
        <div className="hidden text-[11px] text-[color:var(--cs-green-dim)] md:block">
          Cursor: <span className="text-[color:var(--cs-menu-active)]">{cursorLabel}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setArmoryOpen(true)}
        className="cs-ui-button"
      >
        <ShoppingBasket size={16} />
        <span>Buy Menu</span>
      </button>
    </header>
  );
}

