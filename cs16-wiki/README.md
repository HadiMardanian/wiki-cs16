# CS 1.6 Configuration Wiki

A retro-styled documentation website for Counter-Strike 1.6 configuration settings, designed to look and feel like the classic GoldSrc engine interface.

![CS 1.6 Wiki](https://img.shields.io/badge/CS%201.6-Config%20Wiki-00FF00?style=for-the-badge&labelColor=0f0f0f)

## Features

- 🎮 **Authentic CS 1.6 Aesthetic** - CRT scanlines, console-style UI, classic color scheme
- 📋 **Comprehensive Configs** - Network, Mouse, Video, Audio, and Keybind settings
- 📝 **Copy-to-Clipboard** - One-click config copying with visual feedback
- 🔫 **The Armory** - Cursor customization in Buy Menu style
- ⚡ **Technical Analysis** - In-depth explanations for each setting

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArmoryModal.tsx  # Cursor selector modal
│   ├── CodeBlock.tsx    # Console-styled code blocks
│   ├── CRTOverlay.tsx   # Scanlines effect
│   ├── Header.tsx       # Top navigation bar
│   ├── Layout.tsx       # Main layout wrapper
│   ├── PageTitle.tsx    # Page headers
│   ├── ConsoleSection.tsx # Content sections
│   └── Sidebar.tsx      # Left navigation menu
├── context/
│   └── CursorContext.tsx # Cursor state management
├── hooks/
│   └── useMenuSound.ts  # Menu sound effects (simulated)
├── pages/               # Content pages
│   ├── HomePage.tsx
│   ├── NetcodePage.tsx
│   ├── MousePage.tsx
│   ├── VideoPage.tsx
│   ├── AudioPage.tsx
│   └── BindsPage.tsx
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## Design System

### Color Palette

| Color          | Hex       | Usage                    |
|----------------|-----------|--------------------------|
| CS Black       | `#0f0f0f` | Primary background       |
| CS Dark        | `#1a1a1a` | Secondary background     |
| Console Green  | `#00FF00` | Primary accent, text     |
| Menu Yellow    | `#FFD700` | Active menu items        |
| Dim Yellow     | `#B8860B` | Inactive menu items      |
| Warning Orange | `#FF8C00` | Warnings, highlights     |

### Typography

- **Primary**: Courier New (monospace)
- **Display**: Press Start 2P (pixel font)

## Contributing

Feel free to submit issues and pull requests for:
- Additional config categories
- UI/UX improvements
- Bug fixes
- Documentation updates

## License

MIT License - feel free to use for your own retro projects!

---

*"Fire in the hole!"* 🎮
