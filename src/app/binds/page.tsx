import { ConsoleBlock } from "@/components/console/ConsoleBlock";

export default function BindsPage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="font-[family:var(--font-cs-pixel)] text-[14px] text-[color:var(--cs-menu-active)]">
          Binds
        </div>
        <div className="mt-2 max-w-3xl text-[12px] leading-[1.8] text-[color:var(--cs-green-dim)]">
          Practical binds and tiny quality-of-life aliases.
        </div>
      </div>

      <ConsoleBlock
        title="The Config"
        commands={[
          'bind "mwheelup" "+jump"',
          'bind "mwheeldown" "+jump"',
          'bind "f" "use weapon_knife; use weapon_flashbang"',
          'alias "+scores" "+showscores; net_graph 1"',
          'alias "-scores" "-showscores; net_graph 0"',
          'bind "TAB" "+scores"',
        ]}
      />

      <div className="rounded-[2px] border border-[color:var(--cs-green-dim)] bg-[color:var(--cs-panel)] p-3">
        <div className="mb-2 text-[11px] tracking-[0.18em] text-[color:var(--cs-green-dim)]">
          TECHNICAL ANALYSIS
        </div>
        <div className="space-y-3 text-[12px] leading-[1.85] text-[color:var(--cs-menu-dim)]">
          <p>
            Aliases let you build “press/release” behavior by pairing{" "}
            <span className="text-[color:var(--cs-menu-active)]">+name</span> and{" "}
            <span className="text-[color:var(--cs-menu-active)]">-name</span>. It’s effectively a tiny
            state machine: press sets state, release clears it.
          </p>
          <p className="text-[color:var(--cs-green-dim)]">
            Keep binds readable. When you revisit your config mid-scrim, you’ll thank yourself.
          </p>
        </div>
      </div>
    </div>
  );
}

