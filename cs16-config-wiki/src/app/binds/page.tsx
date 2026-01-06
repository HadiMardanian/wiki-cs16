import { ConsoleCodeBlock } from "@/components/ConsoleCodeBlock";

export default function BindsPage() {
  return (
    <div className="space-y-6">
      <h1 className="cs-pixel text-lg text-[var(--cs-menu-hot)]">Binds</h1>
      <ConsoleCodeBlock
        title="Utility binds"
        lines={[
          'bind "mwheeldown" "+jump"',
          'bind "f" "+use"',
          'bind "c" "radio3"',
          'bind "v" "+voicerecord"',
        ]}
      />
      <div className="text-sm text-[var(--cs-green)]/75">
        Placeholder page — add buy binds, quickswitch logic, and alias patterns.
      </div>
    </div>
  );
}

