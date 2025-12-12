# ALAP PARATE | Portfolio

> A cyberpunk-themed interactive portfolio built with React, TypeScript, and Tailwind CSS

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite)

## Features

- **Matrix Rain Background** - Animated matrix-style falling characters with diagonal scrolling grid
- **Draggable Windows** - OS-like window containers with minimize, close, and drag functionality
- **System Monitor** - Real-time scrolling graphs simulating CPU/Memory/Network usage
- **Task Manager** - Interactive process list display
- **Terminal Emulator** - Cyberpunk-styled terminal window
- **Bottom Dock** - macOS-inspired dock for window management
- **Floating Navigation** - Smooth sliding indicator animation
- **Loading Screen** - Blur-in/out animation with percentage counter

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** TanStack Router

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alap-parate/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── bottom-dock.tsx      # Bottom navigation dock
│   ├── contact-section.tsx  # Contact information
│   ├── floating-nav.tsx     # Floating navigation menu
│   ├── hero-section.tsx     # Main hero/landing section
│   ├── loading-screen.tsx   # Initial loading animation
│   ├── matrix-rain.tsx      # Matrix rain background effect
│   ├── system-monitor.tsx   # Real-time system graphs
│   ├── task-manager.tsx     # Process list display
│   ├── terminal.tsx         # Terminal emulator
│   ├── top-bar.tsx          # Top status bar
│   └── window-container.tsx # Draggable window component
├── lib/
│   ├── data.ts              # Personal information data
│   └── utils.ts             # Utility functions
├── App.tsx                  # Main application component
├── index.css                # Global styles & animations
└── main.tsx                 # Application entry point
```

## Customization

Edit `src/lib/data.ts` to update personal information:

```typescript
export const personalInfo = {
  firstName: "YOUR",
  lastName: "NAME",
  role: "YOUR ROLE",
  bio: "Your bio here...",
  email: "your@email.com",
  // ...
}
```

## License

MIT License - feel free to use this for your own portfolio!

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://github.com/alap-parate">Alap Parate</a></strong>
</p>
