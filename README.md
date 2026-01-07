# CS 1.6 Config Wiki (GoldSrc UI)

Modern documentation hub styled like the Counter-Strike 1.6 interface: left main menu, console-like content panel, CRT scanlines, and a “Buy Menu” modal that switches the cursor via a `body` class.

## Dev

```bash
npm install
npm run dev
```

## Tech

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Framer Motion (menu / modal transitions)
- Lucide React (icons)

## Cursor “Armory”

- Cursor selection updates `document.body` with `cs-cursor-*` classes (see `src/app/providers.tsx` and `src/app/globals.css`).
- CSS is already prepared to swap placeholders to real PNG cursors via `cursor: url("/cursors/....png") ...`.