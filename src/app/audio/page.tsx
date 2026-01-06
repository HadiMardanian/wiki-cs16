import { ConsoleBlock } from "@/components/console/ConsoleBlock";

export default function AudioPage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-[family:var(--font-cs-pixel)] text-[14px] text-[color:var(--cs-menu-active)]">
          Audio
        </div>
        <div className="mt-2 max-w-3xl text-[12px] leading-[1.8] text-[color:var(--cs-green-dim)]">
          Clear positional cues, minimal clutter.
        </div>
      </div>

      <ConsoleBlock
        title="The Config"
        commands={[
          "volume 0.5",
          "hisound 1",
          "room_off 1",
          "MP3Volume 0",
          "bgmvolume 0",
        ]}
      />

      <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)] p-3">
        <div className="mb-2 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
          TECHNICAL ANALYSIS
        </div>
        <div className="space-y-3 text-[12px] leading-[1.85] text-[color:var(--cs-menu-dim)]">
          <p>
            Disabling background music keeps your dynamic range for footsteps, reloads, and callouts.
            The classic CS 1.6 soundscape is information-dense — remove anything that competes with it.
          </p>
          <p className="text-[color:var(--cs-green-dim)]">
            Tip: set volume so footsteps are loud but not fatiguing; consistency beats “max volume”.
          </p>
        </div>
      </div>
    </div>
  );
}

