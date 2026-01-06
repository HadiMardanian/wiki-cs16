# Counter-Strike 1.6 Configuration Wiki

Retro GoldSrc-style documentation hub: CS 1.6 main menu sidebar + drop-down console content panel, with an “Armory” buy-menu modal for cursor switching.

## Stack

- React (Vite + TypeScript)
- Tailwind CSS
- Framer Motion (menu/page transitions + modal)
- Lucide React (icons)

## Run

```bash
npm install
npm run dev
```

## Where things live

- `src/App.tsx`: main layout (sidebar + console + armory)
- `src/cs/pages/*`: doc pages (example: `NetcodePage.tsx`)
- `src/cs/components/*`: UI components (console blocks, sidebar, modal)
- `src/index.css`: CRT scanlines + cursor class logic

## Cursor “Armory” (how it works)

- Selecting a cursor applies `cursor-<id>` on the `<body>` via React state.
- CSS is already wired for `cursor: url(...)` with fallbacks (see `src/index.css`).
- To add real cursor PNGs later, place files like:
  - `public/cursors/usp.png`
  - `public/cursors/ak47.png`
  - `public/cursors/awp.png`
