"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "New Config", href: "/" },
  { label: "Netcode", href: "/netcode" },
  { label: "Mouse", href: "/mouse" },
  { label: "Video", href: "/video" },
  { label: "Audio", href: "/audio" },
  { label: "Binds", href: "/binds" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      <div className="px-2 pb-3 text-xs text-[var(--cs-green)]/70 cs-pixel">
        COUNTER-STRIKE 1.6
        <div className="pt-1 text-[10px] text-[var(--cs-green)]/55">CONFIG WIKI</div>
      </div>

      <div className="flex flex-col gap-1">
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "select-none px-3 py-2 text-sm uppercase tracking-wide",
                "border border-transparent",
                "transition-none",
                isActive
                  ? "text-[var(--cs-menu-hot)] border-[var(--cs-border)] bg-black/40"
                  : "text-[var(--cs-menu-idle)] hover:text-[var(--cs-menu-hot)] hover:bg-black/30",
              ].join(" ")}
              onMouseEnter={() => {
                // TODO: replace with real audio later.
                // Distinct hover sound (simulated for now):
                // eslint-disable-next-line no-console
                console.log("[ui] menu_hover");
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

