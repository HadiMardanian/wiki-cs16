"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AudioLines, Crosshair, Home, Keyboard, Monitor, MousePointer2, Wifi } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  { href: "/", label: "New Config", icon: <Home size={16} /> },
  { href: "/netcode", label: "Netcode", icon: <Wifi size={16} /> },
  { href: "/mouse", label: "Mouse", icon: <MousePointer2 size={16} /> },
  { href: "/video", label: "Video", icon: <Monitor size={16} /> },
  { href: "/audio", label: "Audio", icon: <AudioLines size={16} /> },
  { href: "/binds", label: "Binds", icon: <Keyboard size={16} /> },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-dvh flex-col px-4 py-5">
      <div className="mb-5 flex items-center gap-2">
        <Crosshair size={18} className="text-[color:var(--cs-green)]" />
        <div className="font-[family:var(--font-cs-pixel)] text-[12px] leading-[1.2] text-[color:var(--cs-green)]">
          CS 1.6 CONFIG WIKI
        </div>
      </div>

      <div className="mb-3 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
        MAIN MENU
      </div>

      <nav className="min-h-0 flex-1">
        <ul className="flex flex-col gap-2">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                {active ? (
                  <motion.div
                    layoutId="cs-active-nav"
                    className="absolute inset-0 rounded-[2px] border border-[color:var(--cs-green)] bg-[color:var(--cs-panel)]"
                    transition={{ duration: 0.12 }}
                  />
                ) : null}

                <Link
                  href={item.href}
                  onMouseEnter={() => console.log("[SFX] cs16_menu_hover")}
                  className={[
                    "relative flex items-center gap-2 rounded-[2px] px-3 py-2",
                    "border border-transparent",
                    "transition-none select-none",
                    active
                      ? "text-[color:var(--cs-menu-active)]"
                      : "text-[color:var(--cs-menu-dim)] hover:text-[color:var(--cs-menu-active)]",
                  ].join(" ")}
                >
                  <span className={active ? "text-[color:var(--cs-menu-active)]" : "text-[color:var(--cs-menu-dim)]"}>
                    {item.icon}
                  </span>
                  <span className="text-[13px] tracking-[0.02em]">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-5 border-t border-[color:var(--cs-green-dim)] pt-4 text-[11px] text-[color:var(--cs-green-dim)]">
        <div className="mb-1">Status: READY</div>
        <div>Build: GoldSrc UI mock</div>
      </div>
    </div>
  );
}

