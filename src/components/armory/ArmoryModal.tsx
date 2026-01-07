"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUiState } from "@/app/providers";
import { CURSORS, type CursorOption } from "@/lib/cursor";

function CursorCard({
  option,
  active,
  onPick,
}: {
  option: CursorOption;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPick}
      className={[
        "group flex w-full items-center gap-3 rounded-[2px] border px-3 py-3 text-left",
        active
          ? "border-[color:var(--cs-green)] bg-[color:var(--cs-panel)]"
          : "border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel-solid)] hover:border-[color:var(--cs-green)]",
      ].join(" ")}
    >
      <div
        className={[
          "grid h-10 w-10 place-items-center rounded-[2px] border",
          active ? "border-[color:var(--cs-green)]" : "border-[color:var(--cs-green-dim)]",
        ].join(" ")}
        aria-hidden="true"
      >
        <span className="text-[18px]">{option.glyph}</span>
      </div>

      <div className="min-w-0">
        <div className={active ? "text-[color:var(--cs-menu-active)]" : "text-[color:var(--cs-menu-dim)]"}>
          {option.label}
        </div>
        <div className="text-[11px] text-[color:var(--cs-green-dim)]">
          Applies a `body` cursor class
        </div>
      </div>
    </button>
  );
}

export function ArmoryModal() {
  const { armoryOpen, setArmoryOpen, cursor, setCursor } = useUiState();

  useEffect(() => {
    if (!armoryOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setArmoryOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [armoryOpen, setArmoryOpen]);

  return (
    <AnimatePresence>
      {armoryOpen ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setArmoryOpen(false)}
            aria-label="Close"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-[min(720px,calc(100vw-2rem))] rounded-[2px] border border-[color:var(--cs-green)] bg-[color:var(--cs-panel-solid)] shadow-[0_0_0_1px_rgba(0,255,0,0.12),0_20px_80px_rgba(0,0,0,0.65)]"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.14 }}
          >
            <div className="flex items-center justify-between border-b border-[color:var(--cs-green-dim)] px-4 py-3">
              <div>
                <div className="font-[family:var(--font-cs-pixel)] text-[12px] text-[color:var(--cs-green)]">
                  THE ARMORY
                </div>
                <div className="text-[11px] text-[color:var(--cs-green-dim)]">
                  Cursor changer (Buy Menu style)
                </div>
              </div>
              <button type="button" className="cs-ui-button" onClick={() => setArmoryOpen(false)}>
                <X size={16} />
                <span>Close</span>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-3 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
                SELECT CURSOR
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CURSORS.map((opt) => (
                  <CursorCard
                    key={opt.id}
                    option={opt}
                    active={cursor === opt.id}
                    onPick={() => {
                      console.log(`[SFX] cs16_buy_confirm (${opt.id})`);
                      setCursor(opt.id);
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 border-t border-[color:var(--cs-green-dim)] pt-3 text-[11px] text-[color:var(--cs-green-dim)]">
                Tip: later we’ll replace these with real PNG cursors via{" "}
                <span className="text-[color:var(--cs-menu-active)]">
                  {`cursor: url("/cursors/awp.png") 0 0`}
                </span>
                .
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

