import type { ReactNode } from 'react'

export function ConsolePanel({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border border-cs-green/35 bg-cs-console shadow-cs">
      <div className="flex items-center gap-2 border-b border-cs-green/25 bg-black/40 px-3 py-2">
        <div className="text-[9px] leading-none text-cs-green/80">CONSOLE</div>
        <div className="text-[9px] leading-none text-cs-green/50">
          (press ~ in your mind)
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4 md:p-5">{children}</div>
    </section>
  )
}

