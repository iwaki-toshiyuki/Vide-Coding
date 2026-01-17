# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests in watch mode
- `npm run test -- src/utils/time.test.ts` - Run a single test file
- `npm run test:coverage` - Run tests with coverage report

## Tech Stack

- React 19 with TypeScript
- Vite 7 for build tooling
- Vitest with React Testing Library for testing
- Tailwind CSS 4 with Radix UI primitives for styling
- ESLint with TypeScript and React plugins

## Architecture

The app uses React Context for global state management with custom hooks encapsulating business logic.

**State Flow:**
- `TimerContext` provides timer state and controls to all components via `useTimerContext()`
- `ThemeContext` provides dark/light mode via `useThemeContext()`
- Timer settings persist to localStorage

**Key Hooks:**
- `useTimer` (`src/hooks/useTimer.ts`) - Core timer logic: countdown, pause/resume, mode switching
- `useSound` (`src/hooks/useSound.ts`) - Notification and click sounds
- `useTheme` (`src/hooks/useTheme.ts`) - Theme state with system preference detection

**Path Alias:** `@/` maps to `src/` directory
