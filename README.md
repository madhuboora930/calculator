# Neon Calc — Futuristic Calculator

A production-ready calculator built with React, Vite, Tailwind CSS v4, and Framer Motion. A
holographic-LCD look — dark carbon body, glowing fuchsia/cyan gradient display — with full
keyboard support and calculation history.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/index.css`)
- Framer Motion for button press feedback and the history panel transition
- react-icons for UI icons

No external APIs or environment variables — everything runs client-side.

## Features

- Standard operations: add, subtract, multiply, divide, percent, sign toggle
- Full keyboard support (digits, `+ - * /`, `Enter`/`=`, `Escape`/`C`, `Backspace`, `%`)
- Calculation history (click an entry to reuse its result)
- Copy result to clipboard
- Floating-point rounding (no `0.1 + 0.2 = 0.30000000000000004` artifacts)
- Graceful divide-by-zero handling (shows "Error", any key resets)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
  utils/calculate.js         # pure arithmetic + display formatting (no React)
  hooks/
    useCalculator.js         # state machine: input, operators, history
    useKeyboardInput.js      # maps keydown events to calculator actions
  components/
    layout/                 # Header (with back-to-portfolio link), animated background
    calculator/              # Display, History, Keypad, CalcButton
  App.jsx
```

## Build

```bash
npm run build
```

## Deploying to Netlify

`netlify.toml` is already configured (build command `npm run build`, publish directory `dist`).

1. Push this project to a GitHub repo.
2. In Netlify: "Add new site" → "Import an existing project" → pick the repo. Build settings
   auto-detect from `netlify.toml`. Click Deploy.
3. Once you have a live URL, update the placeholder `https://your-site.netlify.app` references in
   `public/robots.txt`, `public/sitemap.xml`, and the `og:image`/`twitter:image` tags in
   `index.html`.
