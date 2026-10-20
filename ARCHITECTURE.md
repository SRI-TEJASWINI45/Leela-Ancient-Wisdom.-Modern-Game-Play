# Technical Design Document: LEELA Architecture

This document outlines the structural software architecture, data parsing flows, and tech stacks driving the LEELA gaming application.

## ⚙️ Core 3-Tier Engine Framework

The system functions across three decoupled layers to ingest scriptural metadata, calculate user telemetry metrics, and render micro-game configurations smoothly:

### 1. Tier 1: Natural Language Processing & Vocal Onboarding
*   **Component:** `src/components/Onboarding/MitraAI.tsx`
*   **Logic:** Uses browser-native HTML5 Web Speech API (`window.speechSynthesis`) to interview users audibly.
*   **State Machine:** Mapped through a custom React Context API (`src/context/LanguageContext.tsx`) driving an instant bilingual state toggle between English and Telugu across all app routes.

### 2. Tier 2: Procedural Game Generation Subsystems
*   **Component:** `src/components/Games/`
*   **Logic:** Translates raw database text arrays into active user game screens based on archetype choice:
    *   *Matti Kusti Canvas:* Uses an state-driven action-card evaluation array (`[Mace Strike]`, `[Power Slam]`, `[Dharmic Shield]`) over a mud-wrestling background.
    *   *Divine Archery:* A vector-aiming canvas checking hit coordinate bounding boxes.

### 3. Tier 3: Telemetry Tracking & Global Retention League
*   **Component:** `src/components/Leagues/Leaderboard.tsx`
*   **Logic:** Logs user interaction timers and accuracy rates. It compiles a scrollable scorecard list featuring the Top 10 users, sorting by Rank, Name, and XP points. It programmatically layers custom cosmetic elements (Ornaments, Traditional Attire, Royal Crowns) onto profile avatars across 11 demonstrative baseline tiers.

## 🛠️ Unified System Engineering Stack

*   **Frontend UI Core:** React.js (v18+) with TypeScript for strict compilation type-safety.
*   **Styling Engine:** Tailwind CSS for dark-themed, glowing indigo and cosmic gold (#FFD700) components.
*   **Database & Migrations:** Supabase/PostgreSQL for persistent session state storage and cross-screen leaderboard syncing.
