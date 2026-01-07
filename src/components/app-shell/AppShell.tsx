"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SidebarNav } from "@/components/app-shell/SidebarNav";
import { TopHeader } from "@/components/app-shell/TopHeader";
import { ArmoryModal } from "@/components/armory/ArmoryModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-dvh bg-[var(--cs-bg)] text-[var(--cs-green)]">
      <div className="crt-scanlines" aria-hidden="true" />

      <div className="mx-auto flex min-h-dvh w-full max-w-[1400px]">
        <aside className="w-[280px] shrink-0 border-r border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel-solid)]">
          <SidebarNav />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopHeader />

          <main className="min-h-0 flex-1 p-4">
            <div className="cs-console-frame h-full">
              <div className="cs-console-topbar">
                <div className="cs-console-title">CONSOLE</div>
                <div className="cs-console-hint">Press ~ to toggle (nostalgia mode)</div>
              </div>

              <div className="cs-console-body">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12 }}
                    className="h-full"
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
      </div>

      <ArmoryModal />
    </div>
  );
}

