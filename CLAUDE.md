# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Build & Development:**
- `pnpm dev` - Start development server (Vite)
- `pnpm build` - Build for production 
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Architecture Overview

This is a React + TypeScript card game scoring application for the "500" card game, built with Vite and styled with Tailwind CSS. The application follows a mobile-first design approach, optimized for iPhone and mobile usage.

**Core Game Logic:**
- Game state management happens in `src/App.tsx` with localStorage persistence
- Scoring calculations are centralized in `src/utils/scoring.ts`
- Game types defined in `src/types/game.ts` (Team, Bid, Round interfaces)
- Scoring constants in `src/constants/scoring.ts`

**Game Flow:**
1. Player setup (team creation with 2 players each)
2. Round-based bidding and scoring
3. Game ends when team reaches 500 points or goes below -500
4. State persists in localStorage with schema versioning

**Key Components:**
- `PlayerSetup` - Initial team configuration
- `BidInput` - Round bidding interface  
- `Scoreboard` - Current scores display
- `RoundHistory` - Past rounds with delete functionality
- `ScoringTable` - Reference scoring chart

**Scoring System:**
- Different card suits have different base scores (Spades: 40, Clubs: 60, etc.)
- Level multipliers add 100 points per level above 6
- Special bids: Misere (250), Open Misere (500)
- Opposition gets 10 points per trick not won by bidding team

**State Management:**
- All game state stored in App.tsx via useState
- localStorage persistence with schema version checking (v2.0)
- Game resets clear localStorage and reinitialize state

## Mobile-First Design Principles

**Responsive Layout Strategy:**
- Primary focus on iPhone and mobile device optimization
- Use `grid-cols-2` for mobile suit selection (efficient screen space usage)
- Responsive spacing: smaller padding/margins on mobile (`p-3 sm:p-6`)
- Compact button sizes: `px-2 py-2` on mobile, `px-4 py-4` on desktop
- Progressive enhancement for larger screens

**Mobile UI Guidelines:**
- Minimize vertical spacing to maximize content visibility
- Use responsive text sizes: `text-lg sm:text-xl` pattern
- Hide secondary text on mobile: `hidden sm:block` for subtitle content
- Compact header with icon-only buttons on mobile, full text on desktop
- Touch-friendly button targets with appropriate sizing

**Breakpoint Usage:**
- `sm:` (640px+) - Tablet and small desktop optimizations
- `md:` (768px+) - Desktop layout improvements
- `lg:` and above - Large screen enhancements
- Always design mobile-first, then enhance for larger screens