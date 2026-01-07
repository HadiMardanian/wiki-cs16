import { ConsoleBlock } from "@/components/console/ConsoleBlock";

export default function MousePage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-[family:var(--font-cs-pixel)] text-[14px] text-[color:var(--cs-menu-active)]">
          Mouse
        </div>
        <div className="mt-2 max-w-3xl text-[12px] leading-[1.8] text-[color:var(--cs-green-dim)]">
          Consistent aim starts with raw input and predictable scaling.
        </div>
      </div>

      <ConsoleBlock
        title="The Config"
        commands={[
          "m_rawinput 1",
          "m_filter 0",
          "m_customaccel 0",
          "sensitivity 2.0",
          "zoom_sensitivity_ratio 1.0",
        ]}
      />

      <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)] p-3">
        <div className="mb-2 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
          TECHNICAL ANALYSIS
        </div>
        <div className="space-y-3 text-[12px] leading-[1.85] text-[color:var(--cs-menu-dim)]">
          <p>
            <span className="text-[color:var(--cs-menu-active)]">m_rawinput 1</span> bypasses some
            OS pointer processing paths (environment-dependent), reducing unexpected smoothing.
          </p>
          <p>
            <span className="text-[color:var(--cs-menu-active)]">m_filter 0</span> disables engine
            mouse filtering (a simple smoothing pass).
          </p>
          <p className="text-[color:var(--cs-green-dim)]">
            Keep OS acceleration disabled if possible; do acceleration tuning in one place only.
          </p>
        </div>
      </div>
    </div>
  );
}

