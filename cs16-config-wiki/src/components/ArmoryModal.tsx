"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCursor } from "@/components/CursorProvider";

export function ArmoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { active, setActive, options } = useCursor();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="armory-backdrop"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="armory"
            className={[
              "w-full max-w-xl border border-[var(--cs-border)] bg-black/90",
              "shadow-[0_0_0_1px_rgba(0,255,0,0.15),0_18px_60px_rgba(0,0,0,0.65)]",
            ].join(" ")}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.14 }}
          >
            <div className="flex items-center justify-between border-b border-[var(--cs-border)] px-4 py-3">
              <div className="cs-pixel text-sm text-[var(--cs-menu-hot)]">BUY MENU // THE ARMORY</div>
              <button
                type="button"
                onClick={onClose}
                className="border border-[var(--cs-border)] bg-black/60 px-2 py-1 text-[var(--cs-green)] hover:bg-black/80"
                aria-label="Close Armory"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="pb-3 text-xs uppercase tracking-wider text-[var(--cs-green)]/75">
                Select cursor
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {options.map((opt) => {
                  const selected = opt.id === active;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActive(opt.id)}
                      className={[
                        "group flex flex-col items-center justify-center gap-2 p-3",
                        "border bg-black/60",
                        selected
                          ? "border-[var(--cs-border)] text-[var(--cs-menu-hot)]"
                          : "border-[var(--cs-border)]/40 text-[var(--cs-menu-idle)] hover:border-[var(--cs-border)] hover:text-[var(--cs-menu-hot)]",
                      ].join(" ")}
                    >
                      <div className="flex h-10 w-10 items-center justify-center border border-[var(--cs-border)]/40 bg-black/50 text-xl">
                        {opt.glyph}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide">{opt.label}</div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 text-xs leading-5 text-[var(--cs-green)]/70">
                Tip: this is wired to <span className="text-[var(--cs-menu-hot)]">body</span> classes
                (e.g. <span className="text-[var(--cs-menu-hot)]">cursor-awp</span>). Swap in real
                cursor assets later via <span className="text-[var(--cs-menu-hot)]">cursor: url(...)</span>.
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

