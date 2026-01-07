import { ConsoleCodeBlock } from '../components/ConsoleCodeBlock'

export function BindsPage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-[14px] leading-6 text-cs-amberBright">Binds</div>
        <div className="mt-2 text-[10px] leading-5 text-cs-green/70">
          Keep binds explicit, readable, and conflict-free.
        </div>
      </div>

      <ConsoleCodeBlock
        title="Utility Binds"
        commandLines={[
          'bind "mwheelup" "+jump"',
          'bind "mwheeldown" "+jump"',
          'bind "f" "+use"',
          'bind "q" "lastinv"',
          'bind "tab" "+showscores"',
        ]}
      />
    </div>
  )
}

