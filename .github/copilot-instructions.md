# CS 1.6 Wiki - AI Coding Guidelines

## Architecture Overview
This is a React SPA built with Vite, featuring a retro Counter-Strike 1.6 aesthetic. The app uses nested routing under a console-styled layout with CRT effects.

- **Main App**: `cs16-wiki/` - Active project with React 19, Tailwind v4
- **Routing**: React Router with nested routes in `App.tsx`, all pages wrapped in `Layout` component
- **State Management**: React Context for cursor customization (`CursorProvider`)
- **Animations**: Framer Motion for page transitions and UI effects

## Component Patterns
- **Layout Structure**: `Layout.tsx` provides console frame with `Sidebar`, `Header`, `CRTOverlay`
- **Pages**: Located in `src/pages/`, each representing a config category (e.g., `NetcodePage.tsx`)
- **Reusable Components**: `ConsoleSection` for content blocks, `CodeBlock` for copyable configs
- **Styling**: Use Tailwind classes with CS color palette (e.g., `text-cs-green`, `bg-cs-dark`)

Example component structure:
```tsx
<ConsoleSection title="Network Settings">
  <CodeBlock code="// Optimized netcode config" />
</ConsoleSection>
```

## Styling Conventions
- **Colors**: Custom CS palette defined in `tailwind.config.js` (e.g., `cs-green: #00FF00`)
- **Fonts**: Courier New for body, Press Start 2P for headings
- **Animations**: Use Framer Motion for enters/exits, custom keyframes for CRT effects
- **CSS**: Global styles in `index.css`, custom scrollbar and cursor classes

## Developer Workflows
- **Development**: `npm run dev` in `cs16-wiki/` directory
- **Build**: `npm run build` (includes TypeScript compilation)
- **Linting**: `npm run lint` (ESLint with React rules)
- **Deploy**: `npm run deploy` pushes to GitHub Pages

## Key Files
- `src/App.tsx`: Routing setup with `CursorProvider`
- `src/components/Layout.tsx`: Main layout with console styling
- `src/context/CursorProvider.tsx`: Cursor state management
- `tailwind.config.js`: Extended theme with CS colors and animations
- `src/index.css`: Global styles and CRT overlay

## Cursor Customization
The app features weapon-based cursors managed via context. Update `src/data/cursorOptions.ts` for new cursors and apply CSS classes to `document.body` in `CursorProvider`.

## Sound Effects
Menu sounds are simulated via `useMenuSound` hook (console logs). Extend for actual audio if needed.

## Notes
- No test suite currently implemented
- Focus on retro gaming aesthetic in all UI additions
- Use Lucide React icons for consistency</content>
<parameter name="filePath">/workspaces/wiki-cs16/.github/copilot-instructions.md