export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <div className="text-[14px] leading-6 text-cs-amberBright">{title}</div>
      <div className="text-[10px] leading-5 text-cs-green/70">
        Documentation page scaffolded. Add commands + analysis like the Netcode
        page.
      </div>
      <div className="border border-cs-green/20 bg-black/30 p-4 text-[10px] leading-5 text-cs-green/70">
        ] todo: populate commands
        <br />] todo: add technical notes
      </div>
    </div>
  )
}

