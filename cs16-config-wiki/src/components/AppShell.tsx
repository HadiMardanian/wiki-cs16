"use client";

import React, { useMemo, useState } from "react";
import { SidebarNav } from "@/components/SidebarNav";
import { ArmoryModal } from "@/components/ArmoryModal";
import { Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";

function titleForPath(pathname: string) {
  switch (pathname) {
    case "/":
      return "NEW CONFIG";
    case "/netcode":
      return "NETCODE";
    case "/mouse":
      return "MOUSE";
    case "/video":
      return "VIDEO";
    case "/audio":
      return "AUDIO";
    case "/binds":
      return "BINDS";
    default:
      return "CONSOLE";
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [armoryOpen, setArmoryOpen] = useState(false);

  const sectionTitle = useMemo(() => titleForPath(pathname), [pathname]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
        {/* Sidebar (CS 1.6 main menu style) */}
        <aside className="w-[280px] shrink-0 border-r border-[var(--cs-border)] bg-black/45">
          <SidebarNav />
          <div className="px-5 pt-6 text-[10px] leading-5 text-[var(--cs-green)]/55">
            <div>Build: GoldSrc UI skin</div>
            <div>Status: LIVE</div>
          </div>
        </aside>

        {/* Main console area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-[var(--cs-border)] bg-black/35 px-4 py-3">
            <div className="min-w-0">
              <div className="cs-pixel text-xs text-[var(--cs-green)]/70">Counter-Strike 1.6</div>
              <div className="truncate cs-pixel text-sm text-[var(--cs-menu-hot)]">{sectionTitle}</div>
            </div>

            <button
              type="button"
              onClick={() => setArmoryOpen(true)}
              className={[
                "flex items-center gap-2 px-3 py-2 text-xs uppercase",
                "border border-[var(--cs-border)] bg-black/60",
                "text-[var(--cs-menu-hot)] hover:bg-black/80",
              ].join(" ")}
              aria-label="Open Armory cursor menu"
            >
              <Settings2 size={16} />
              Buy Menu
            </button>
          </header>

          <main className="min-w-0 flex-1 p-4">
            <div
              className={[
                "relative min-h-[calc(100vh-120px)]",
                "border border-[var(--cs-border)] bg-[var(--cs-panel)]",
                "shadow-[0_0_0_1px_rgba(0,255,0,0.12),0_12px_40px_rgba(0,0,0,0.6)]",
              ].join(" ")}
            >
              <div className="border-b border-[var(--cs-border)] bg-black/40 px-4 py-2 text-xs uppercase tracking-wider text-[var(--cs-green)]/75">
                Console
              </div>
              <div className="p-4">{children}</div>
            </div>
          </main>
        </div>
      </div>

      <ArmoryModal open={armoryOpen} onClose={() => setArmoryOpen(false)} />
    </div>
  );
}

