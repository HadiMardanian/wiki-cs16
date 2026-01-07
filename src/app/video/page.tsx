import { ConsoleBlock } from "@/components/console/ConsoleBlock";

export default function VideoPage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-[family:var(--font-cs-pixel)] text-[14px] text-[color:var(--cs-menu-active)]">
          Video
        </div>
        <div className="mt-2 max-w-3xl text-[12px] leading-[1.8] text-[color:var(--cs-green-dim)]">
          FPS stability and visibility-first video tuning.
        </div>
      </div>

      <ConsoleBlock
        title="The Config"
        commands={[
          "fps_max 101",
          "cl_showfps 1",
          "gl_vsync 0",
          "gamma 3",
          "brightness 3",
        ]}
      />

      <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)] p-3">
        <div className="mb-2 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
          TECHNICAL ANALYSIS
        </div>
        <div className="space-y-3 text-[12px] leading-[1.85] text-[color:var(--cs-menu-dim)]">
          <p>
            <span className="text-[color:var(--cs-menu-active)]">fps_max</span> caps render frames.
            In CS 1.6, stable frame pacing can help input feel more consistent (especially on older
            systems / drivers).
          </p>
          <p>
            <span className="text-[color:var(--cs-menu-active)]">gl_vsync 0</span> avoids waiting
            for v-blank, reducing latency at the cost of tearing.
          </p>
          <p className="text-[color:var(--cs-green-dim)]">
            Exact cvars can vary by renderer and server. Treat these as a baseline.
          </p>
        </div>
      </div>
    </div>
  );
}

