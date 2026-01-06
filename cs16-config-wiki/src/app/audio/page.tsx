import { ConsoleCodeBlock } from "@/components/ConsoleCodeBlock";

export default function AudioPage() {
  return (
    <div className="space-y-6">
      <h1 className="cs-pixel text-lg text-[var(--cs-menu-hot)]">Audio</h1>
      <ConsoleCodeBlock
        title="Clarity & positioning"
        lines={[
          "s_a3d 0",
          "s_eax 0",
          "hisound 1",
          "room_off 1",
        ]}
      />
      <div className="text-sm text-[var(--cs-green)]/75">
        Placeholder page — add footstep mix strategy and comms/voice settings.
      </div>
    </div>
  );
}

