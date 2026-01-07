import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { CURSORS, type CursorId } from '../cursor'
import { UiButton } from './UiButton'

export function ArmoryModal({
  open,
  activeCursor,
  onClose,
  onSelectCursor,
}: {
  open: boolean
  activeCursor: CursorId
  onClose: () => void
  onSelectCursor: (cursor: CursorId) => void
}) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 p-4 md:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="w-full max-w-2xl border border-cs-green/35 bg-[#050505] shadow-cs"
          >
            <div className="flex items-center justify-between border-b border-cs-green/25 px-4 py-3">
              <div>
                <div className="text-[10px] leading-5 text-cs-amberBright">
                  BUY MENU — THE ARMORY
                </div>
                <div className="text-[9px] leading-4 text-cs-green/60">
                  Select a cursor loadout.
                </div>
              </div>

              <UiButton onClick={onClose} title="Close">
                <X className="h-4 w-4" />
                <span className="hidden text-[10px] md:inline">CLOSE</span>
              </UiButton>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-[240px_1fr]">
              <div className="border border-cs-green/20 bg-black/40 p-3">
                <div className="text-[9px] leading-4 text-cs-green/70">
                  Categories
                </div>
                <div className="mt-2 space-y-2 text-[10px]">
                  <div className="text-cs-amberBright">- Pistols</div>
                  <div className="text-cs-amberBright">- Rifles</div>
                  <div className="text-cs-amberBright">- Sniper</div>
                  <div className="text-cs-amberBright">- Knife</div>
                </div>
                <div className="mt-4 text-[9px] leading-4 text-cs-green/50">
                  Note: cursor URLs are wired in CSS; swap in PNGs later.
                </div>
              </div>

              <div className="border border-cs-green/20 bg-black/40 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[9px] leading-4 text-cs-green/70">
                    Cursor Select
                  </div>
                  <div className="text-[9px] leading-4 text-cs-green/50">
                    Active: {CURSORS.find((c) => c.id === activeCursor)?.label}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {CURSORS.map((c) => {
                    const active = c.id === activeCursor
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onSelectCursor(c.id)}
                        className={[
                          'group border px-2 py-3 text-left transition-none',
                          active
                            ? 'border-cs-green/60 bg-black/70'
                            : 'border-cs-green/25 bg-black/35 hover:bg-black/60',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-2">
                          <div className="grid h-8 w-8 place-items-center border border-cs-green/25 bg-black/60 text-[14px]">
                            {c.glyph}
                          </div>
                          <div className="min-w-0">
                            <div
                              className={[
                                'truncate text-[10px] leading-4',
                                active ? 'text-cs-amberBright' : 'text-cs-amber',
                              ].join(' ')}
                            >
                              {c.id.toUpperCase()}
                            </div>
                            <div className="truncate text-[9px] leading-4 text-cs-green/60">
                              {c.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-cs-green/20 px-4 py-3 text-[9px] leading-4 text-cs-green/55">
              Hint: press <span className="text-cs-amberBright">ESC</span> to close.
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

