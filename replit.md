# Dopamine Station

A gamified productivity hub with a calm, artistic "Sunny Canvas" design inspired by Studio Ghibli and Japanese aesthetics.

## Overview

Dopamine Station is a single-page productivity application that gamifies time tracking and task management. The UI features a peaceful, watercolor-inspired design that feels like a sunny Japanese park.

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
│   ├── HeroSection.jsx   # Animated hero with hand-drawn text
│   ├── TimeTracker.jsx   # Journal Entry - work logger
│   ├── StatsDashboard.jsx # Your Progress - stats dashboard
│   ├── TaskBoard.jsx     # Task Board - task manager
│   └── FloatingDock.jsx  # Bottom navigation dock
└── context/
    └── HoursContext.jsx  # State management for hours/tasks
```

## Features

### Journal Entry (Work Logger)
- Log completed work with task name, duration, and category
- Categories: Focus Time, Deep Work, Admin, Creative
- Gentle confetti celebration on task completion

### Your Progress (Hours Calculator)
- Daily and weekly progress bars with watercolor gradients
- Day streak counter
- Total entries counter
- Motivational messages based on progress

### Task Board (Task Planning)
- Sticky-note style cards with priority levels (Important, High, Medium, Low)
- Add, edit, delete, and complete tasks
- Tasks persist in LocalStorage

## Design Philosophy

- **Digital Watercolor:** Clean, artistic, peaceful aesthetic
- **Sunny Canvas:** Light backgrounds, soft shadows, no harsh borders
- **Studio Ghibli Inspired:** Calm, productive, nature-inspired
- **Gentle Animations:** Fade and float effects, smooth transitions

## Color Palette

- **Base:** White / Off-White (#FAFAF9)
- **Sakura Pink:** #FFB7B2 (highlights)
- **Matcha Green:** #B5EAD7 (success/progress)
- **Sky Blue:** #A0C4FF (neutral elements)
- **Sandstone Orange:** #FFDAC1 (active states)
- **Text:** Dark Grey (#4A4A4A)

## Typography

- **Body:** Nunito (rounded sans-serif)
- **Headers:** Patrick Hand (hand-written style)

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

- December 7, 2025: Complete UI redesign - "Sunny Canvas" theme
  - Replaced neon-arcade aesthetic with calm watercolor design
  - New color palette (sakura pink, matcha green, sky blue, sandstone)
  - New typography (Nunito, Patrick Hand)
  - Removed all glitch effects and harsh borders
  - Added soft shadows and rounded corners
  - Updated all components with gentle fade/float animations
