import { ConsoleCodeBlock } from '../components/ConsoleCodeBlock'

export function HomePage() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-[14px] leading-6 text-cs-amberBright">
          New Config
        </div>
        <div className="mt-2 text-[10px] leading-5 text-cs-green/70">
          A modern documentation hub that looks like the CS 1.6 interface. Use the
          left menu to load topics, then copy/paste commands like a real console.
        </div>
      </div>

      <ConsoleCodeBlock
        title="Quick Start"
        commandLines={[
          'exec autoexec.cfg',
          'echo "cs16-wiki: ready"',
          'developer 1',
        ]}
      />
    </div>
  )
}

