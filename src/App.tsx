import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ArmoryModal } from './cs/components/ArmoryModal'
import { ConsolePanel } from './cs/components/ConsolePanel'
import { HeaderBar } from './cs/components/HeaderBar'
import { Sidebar } from './cs/components/Sidebar'
import { CURSORS, type CursorId } from './cs/cursor'
import { BindsPage } from './cs/pages/BindsPage'
import { HomePage } from './cs/pages/HomePage'
import { NetcodePage } from './cs/pages/NetcodePage'
import { PlaceholderPage } from './cs/pages/PlaceholderPage'

type PageId = 'home' | 'netcode' | 'mouse' | 'video' | 'audio' | 'binds'

const PAGES: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'New Config' },
  { id: 'netcode', label: 'Netcode' },
  { id: 'mouse', label: 'Mouse' },
  { id: 'video', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'binds', label: 'Binds' },
]

const CURSOR_CLASSES = CURSORS.map((c) => `cursor-${c.id}` as const)

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('netcode')
  const [armoryOpen, setArmoryOpen] = useState(false)
  const [cursor, setCursor] = useState<CursorId>('knife')

  useEffect(() => {
    document.body.classList.remove(...CURSOR_CLASSES)
    document.body.classList.add(`cursor-${cursor}`)
  }, [cursor])

  const page = useMemo(() => {
    switch (activePage) {
      case 'home':
        return <HomePage />
      case 'netcode':
        return <NetcodePage />
      case 'binds':
        return <BindsPage />
      case 'mouse':
        return <PlaceholderPage title="Mouse Settings" />
      case 'video':
        return <PlaceholderPage title="Video Settings" />
      case 'audio':
        return <PlaceholderPage title="Audio Settings" />
      default:
        return <HomePage />
    }
  }, [activePage])

  return (
    <div className="relative h-screen w-screen bg-cs-bg text-cs-green">
      <div className="crt-scanlines" />

      <div className="flex h-full min-w-0">
        <Sidebar
          items={PAGES}
          activeId={activePage}
          onSelect={(id) => setActivePage(id)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <HeaderBar
            cursorLabel={CURSORS.find((c) => c.id === cursor)?.label ?? 'Knife'}
            onOpenArmory={() => setArmoryOpen(true)}
          />

          <main className="flex min-h-0 flex-1 flex-col p-4 md:p-6">
            <ConsolePanel>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="min-w-0"
                >
                  {page}
                </motion.div>
              </AnimatePresence>
            </ConsolePanel>
          </main>
        </div>
      </div>

      <ArmoryModal
        open={armoryOpen}
        activeCursor={cursor}
        onClose={() => setArmoryOpen(false)}
        onSelectCursor={(next) => setCursor(next)}
      />
    </div>
  )
}
