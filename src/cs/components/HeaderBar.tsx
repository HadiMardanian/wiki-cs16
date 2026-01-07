import { Settings } from 'lucide-react'
import { UiButton } from './UiButton'

export function HeaderBar({
  onOpenArmory,
  cursorLabel,
}: {
  onOpenArmory: () => void
  cursorLabel: string
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-cs-green/20 bg-[#0b0b0b] px-4 md:px-6">
      <div className="min-w-0">
        <div className="truncate text-[10px] leading-5 text-cs-green/80">
          ] cs16-wiki.exe
        </div>
        <div className="truncate text-[9px] leading-4 text-cs-green/50">
          Active cursor: {cursorLabel}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <UiButton onClick={onOpenArmory} variant="primary" title="Open The Armory">
          <Settings className="h-4 w-4" />
          <span className="hidden text-[10px] md:inline">BUY MENU</span>
        </UiButton>
      </div>
    </header>
  )
}

