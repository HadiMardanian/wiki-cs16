import { Copy } from 'lucide-react'
import { useMemo, useState } from 'react'
import { UiButton } from './UiButton'

export function ConsoleCodeBlock({
  title,
  commandLines,
}: {
  title?: string
  commandLines: string[] | string
}) {
  const [copied, setCopied] = useState(false)

  const text = useMemo(() => {
    const lines = Array.isArray(commandLines) ? commandLines : commandLines.split('\n')
    return lines.map((l) => l.trimEnd()).join('\n').trim() + '\n'
  }, [commandLines])

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback for older clipboard environments
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 900)
  }

  return (
    <div className="border border-cs-green/25 bg-black/35">
      <div className="flex items-center justify-between gap-3 border-b border-cs-green/20 px-3 py-2">
        <div className="min-w-0 truncate text-[9px] leading-none text-cs-green/60">
          {title ?? 'The Config'}
        </div>
        <UiButton onClick={onCopy} variant="default" title="Copy to clipboard">
          <Copy className="h-3.5 w-3.5" />
          <span className="text-[9px]">{copied ? 'COPIED' : 'COPY'}</span>
        </UiButton>
      </div>

      <pre className="overflow-auto px-3 py-3 font-mono text-[11px] leading-5 text-cs-green">
        {text
          .trimEnd()
          .split('\n')
          .map((line, idx) => (
            <div key={idx}>
              <span className="text-cs-green/70">]</span> {line}
            </div>
          ))}
      </pre>
    </div>
  )
}

