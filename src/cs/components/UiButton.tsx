import type { ReactNode } from 'react'

export function UiButton({
  children,
  onClick,
  title,
  variant = 'default',
}: {
  children: ReactNode
  onClick?: () => void
  title?: string
  variant?: 'default' | 'primary'
}) {
  const base =
    'inline-flex items-center gap-2 border px-3 py-2 text-[10px] leading-none tracking-wide transition-none'
  const style =
    variant === 'primary'
      ? 'border-cs-green/50 bg-black/50 text-cs-amberBright hover:bg-black/70'
      : 'border-cs-green/30 bg-black/30 text-cs-amber hover:bg-black/50'

  return (
    <button type="button" title={title} onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  )
}

