# Dopamine Station

A gamified maximalist productivity hub built with React, featuring a neon-arcade aesthetic with neo-brutalist design elements.

## Overview

Dopamine Station is a single-page productivity application that gamifies time tracking and task management. The UI is intentionally loud, colorful, and animated to create an engaging "video game" feel for productivity work.

## Tech Stack

- **Framework:** React with Vite
- **Styling:** Tailwind CSS v4 with custom theme
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Effects:** Canvas Confetti
- **Persistence:** LocalStorage

## Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Main app component
├── index.css             # Global styles and Tailwind theme
├── components/
│   ├── HeroSection.jsx   # Animated hero with glitch text
│   ├── TimeTracker.jsx   # Time Machine - work logger
│   ├── StatsDashboard.jsx # Power Meter - stats dashboard
│   ├── TaskBoard.jsx     # Mission Board - task manager
│   └── FloatingDock.jsx  # Bottom navigation dock
└── context/
    └── HoursContext.jsx  # State management for hours/tasks
```

## Features

### Time Machine (Work Logger)
- Log completed work with task name, duration, and category
- Categories: Grind, Deep Work, Admin, Creative
- Confetti celebration on task completion

### Power Meter (Hours Calculator)
- Daily and weekly progress bars
- Day streak counter
- Total logs counter
- Motivational messages based on progress

### Mission Board (Task Planning)
- RPG-style quest cards with priorities (Legendary, Epic, Rare, Common)
- Add, edit, delete, and complete tasks
- Tasks persist in LocalStorage

## Design Philosophy

- **Pop-Culture Maximalism:** Loud, fun, and heavy design
- **Neo-Brutalism:** Thick borders, harsh shadows
- **Retro-Arcade:** Neon colors, glitch effects
- **Bouncy Physics:** Framer Motion for interactive elements

## Running Locally

```bash
npm install
npm run dev
```

The app runs on port 5000.

## Building for Production

```bash
npm run build
```

Output goes to the `dist` directory.

## Recent Changes

- Initial build: December 7, 2025
- Set up React + Vite project
- Configured Tailwind CSS v4 with custom neon theme
- Built all core components with animations
- Added LocalStorage persistence
