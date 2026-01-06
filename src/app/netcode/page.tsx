import { ConsoleBlock } from "@/components/console/ConsoleBlock";

export default function NetcodePage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-[family:var(--font-cs-pixel)] text-[14px] text-[color:var(--cs-menu-active)]">
          Network Settings
        </div>
        <div className="mt-2 max-w-3xl text-[12px] leading-[1.8] text-[color:var(--cs-green-dim)]">
          Netcode tuning for stable hit registration and consistent interpolation behavior.
        </div>
      </div>

      <ConsoleBlock
        title="The Config"
        commands={[
          "rate 25000",
          "cl_cmdrate 101",
          "cl_updaterate 101",
          "cl_interp 0",
          "cl_interp_ratio 1",
          "cl_lagcompensation 1",
          "cl_predict 1",
          "cl_predictweapons 1",
        ]}
      />

      <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)] p-3">
        <div className="mb-2 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
          TECHNICAL ANALYSIS
        </div>

        <div className="space-y-3 text-[12px] leading-[1.85] text-[color:var(--cs-menu-dim)]">
          <p>
            <span className="text-[color:var(--cs-menu-active)]">cmdrate</span> controls how many
            user command packets you send per second.{" "}
            <span className="text-[color:var(--cs-menu-active)]">updaterate</span> controls how many
            update snapshots you request per second. Matching them avoids “stair-stepping” in
            server/client timing.
          </p>
          <p>
            <span className="text-[color:var(--cs-menu-active)]">rate</span> is your bandwidth cap
            (bytes/sec). Setting it high enough prevents the engine from throttling updates, which
            can manifest as delayed player state changes.
          </p>
          <p>
            <span className="text-[color:var(--cs-menu-active)]">cl_interp</span> and{" "}
            <span className="text-[color:var(--cs-menu-active)]">cl_interp_ratio</span> define the
            interpolation buffer. With <span className="text-[color:var(--cs-menu-active)]">interp 0</span>{" "}
            the engine derives interpolation from ratio/updaterate (effectively:{" "}
            <span className="text-[color:var(--cs-menu-active)]">interp = ratio / updaterate</span>
            ). Ratio 1 minimizes additional buffering; increase it only if you have unstable packet
            delivery.
          </p>
          <p className="text-[color:var(--cs-green-dim)]">
            Note: server rules can clamp these values. Your client can request, but the server can
            enforce.
          </p>
        </div>
      </div>
    </div>
  );
}

