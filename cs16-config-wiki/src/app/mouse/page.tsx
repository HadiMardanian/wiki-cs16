import { ConsoleCodeBlock } from "@/components/ConsoleCodeBlock";

export default function MousePage() {
  return (
    <div className="space-y-6">
      <h1 className="cs-pixel text-lg text-[var(--cs-menu-hot)]">Mouse</h1>
      <ConsoleCodeBlock
        title="Starter mouse config"
        lines={[
          "m_rawinput 1",
          "m_filter 0",
          "sensitivity 2.0",
          "zoom_sensitivity_ratio 1.0",
        ]}
      />
      <div className="text-sm text-[var(--cs-green)]/75">
        Placeholder page — extend with DPI math, accel pitfalls, and consistent aiming workflow.
      </div>
    </div>
  );
}

