import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-[family:var(--font-cs-pixel)] text-[14px] text-[color:var(--cs-menu-active)]">
          New Config
        </div>
        <div className="mt-2 max-w-3xl text-[12px] leading-[1.8] text-[color:var(--cs-green-dim)]">
          Welcome to the Counter-Strike 1.6 Configuration Wiki — a modern docs hub wrapped in a
          GoldSrc-style UI. Pick a topic on the left, or open the Buy Menu (top-right) to change
          your cursor.
        </div>
      </div>

      <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)] p-3">
        <div className="mb-2 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
          QUICKSTART
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { href: "/netcode", label: "Network Settings" },
            { href: "/mouse", label: "Mouse & Sensitivity" },
            { href: "/video", label: "Video / FPS" },
            { href: "/audio", label: "Audio" },
            { href: "/binds", label: "Binds & Aliases" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-[2px] border border-[color:var(--cs-green-dim)] bg-black/50 px-3 py-2 text-[color:var(--cs-menu-dim)] hover:border-[color:var(--cs-green)] hover:text-[color:var(--cs-menu-active)]"
            >
              <span className="text-[13px]">{item.label}</span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>
      </div>

      <div className="text-[12px] leading-[1.8] text-[color:var(--cs-green)]">
        <div className="text-[color:var(--cs-green-dim)]">]</div>
        <div className="text-[color:var(--cs-green-dim)]">] type `rate`? we’ve got you.</div>
      </div>
    </div>
  );
}
