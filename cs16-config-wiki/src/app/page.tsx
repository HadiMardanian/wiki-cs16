import Link from "next/link";
import { ConsoleCodeBlock } from "@/components/ConsoleCodeBlock";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="cs-pixel text-lg text-[var(--cs-menu-hot)]">CS 1.6 Configuration Wiki</h1>
        <p className="text-sm leading-6 text-[var(--cs-green)]/80">
          A modern docs hub wrapped in the GoldSrc interface. Use the left menu like the main menu.
        </p>
      </div>

      <ConsoleCodeBlock
        title="Quick start"
        lines={[
          'echo "CS 1.6 Config Wiki initialized"',
          "exec autoexec.cfg",
          "net_graph 1",
        ]}
      />

      <div className="text-sm text-[var(--cs-green)]/80">
        Next: open{" "}
        <Link
          href="/netcode"
          className="text-[var(--cs-menu-hot)] underline decoration-[var(--cs-border)] underline-offset-4"
        >
          Netcode
        </Link>{" "}
        to see the example content structure (config + technical analysis).
      </div>
    </div>
  );
}
