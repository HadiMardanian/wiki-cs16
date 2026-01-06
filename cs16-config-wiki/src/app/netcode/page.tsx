import { ConsoleCodeBlock } from "@/components/ConsoleCodeBlock";

export default function NetcodePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="cs-pixel text-lg text-[var(--cs-menu-hot)]">Network Settings</h1>
        <p className="text-sm leading-6 text-[var(--cs-green)]/80">
          Netcode is where you reduce buffering, stabilize interpolation, and make your hits feel
          consistent under real server tick + latency conditions.
        </p>
      </div>

      <section className="space-y-3">
        <ConsoleCodeBlock
          title="The Config"
          lines={[
            "rate 25000",
            "cl_cmdrate 101",
            "cl_updaterate 101",
            "cl_interp 0",
            "cl_interp_ratio 1",
            "ex_interp 0.01",
          ]}
        />
        <div className="text-xs text-[var(--cs-green)]/70">
          Note: values may be server-limited; tune around your connection and server rules.
        </div>
      </section>

      <section className="space-y-3 border border-[var(--cs-border)] bg-black/35 p-4">
        <div className="cs-pixel text-sm text-[var(--cs-warn)]">Technical Analysis</div>
        <div className="space-y-2 text-sm leading-6 text-[var(--cs-warn)]/90">
          <p>
            <span className="text-[var(--cs-menu-hot)]">rate</span> caps your incoming bandwidth for
            updates. Too low forces packet budget cuts; too high is usually fine on modern links.
          </p>
          <p>
            <span className="text-[var(--cs-menu-hot)]">cl_cmdrate</span> /{" "}
            <span className="text-[var(--cs-menu-hot)]">cl_updaterate</span> request how often you
            send commands and receive entity updates. Higher isn’t always “better” unless the
            server actually runs those rates and your connection is stable.
          </p>
          <p>
            <span className="text-[var(--cs-menu-hot)]">cl_interp</span> /{" "}
            <span className="text-[var(--cs-menu-hot)]">cl_interp_ratio</span> define interpolation
            delay. In practice you’re choosing a buffer size that trades smoothness for freshness.
          </p>
          <p>
            <span className="text-[var(--cs-menu-hot)]">ex_interp</span> is the classic CS 1.6
            shortcut to control effective interpolation (often aligned with ~0.01 for 100 updates/s
            scenarios), but servers and modern client behavior can override the “old school” intent.
          </p>
        </div>
      </section>
    </div>
  );
}

