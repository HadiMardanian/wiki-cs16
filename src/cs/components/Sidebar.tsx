import { motion } from 'framer-motion'
import { useMemo } from 'react'

type SidebarItem<TId extends string> = {
  id: TId
  label: string
}

export function Sidebar<TId extends string>({
  items,
  activeId,
  onSelect,
}: {
  items: Array<SidebarItem<TId>>
  activeId: TId
  onSelect: (id: TId) => void
}) {
  const activeIndex = useMemo(
    () => Math.max(0, items.findIndex((i) => i.id === activeId)),
    [items, activeId],
  )

  return (
    <aside className="relative h-full w-[220px] flex-none border-r border-cs-green/30 bg-[#0b0b0b] md:w-[280px]">
      <div className="px-5 pb-4 pt-6">
        <div className="text-[10px] leading-5 text-cs-green/80">
          COUNTER-STRIKE 1.6
        </div>
        <div className="mt-1 text-[12px] leading-5 text-cs-amberBright">
          CONFIGURATION WIKI
        </div>
      </div>

      <div className="relative px-3 pb-6">
        <motion.div
          className="absolute left-0 top-0 h-10 w-1 bg-cs-green/70"
          animate={{ y: activeIndex * 40 }}
          transition={{ type: 'tween', duration: 0.12 }}
        />

        <nav className="space-y-0">
          {items.map((item) => {
            const active = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => console.log('ui/menu_hover', item.id)}
                onClick={() => {
                  console.log('ui/menu_select', item.id)
                  onSelect(item.id)
                }}
                className={[
                  'group relative flex h-10 w-full items-center px-4 text-left',
                  'border-y border-transparent',
                  active
                    ? 'bg-black/40 text-cs-amberBright'
                    : 'text-cs-amber hover:bg-black/25 hover:text-cs-amberBright',
                  'transition-none',
                ].join(' ')}
              >
                <span className="text-[11px] leading-none tracking-wide">
                  {item.label}
                </span>
                <span
                  className={[
                    'ml-auto text-[10px] opacity-0 transition-none',
                    active ? 'opacity-100 text-cs-green/80' : 'group-hover:opacity-100',
                  ].join(' ')}
                >
                  ▶
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-cs-green/20 px-5 py-4">
        <div className="text-[9px] leading-4 text-cs-green/50">
          Tip: hover menu items = sound cue.
        </div>
      </div>
    </aside>
  )
}

