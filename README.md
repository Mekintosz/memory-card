# NASA Images Memory Card Game

Memorize and click each image only once. If you click the same image twice, your score resets. Reach 10 unique clicks to win. Images are fetched from NASA's APOD API and reshuffle after every correct click.

Live demo: https://mekintosz.github.io/memory-card/

![screenshot-localhost_5173-2024 03 16-20_06_26](https://github.com/Mekintosz/memory-card/assets/134439256/8bc059d4-51a9-440d-9f19-eec134a9f987)

---

## Features

- Dynamic image board powered by NASA APOD API (random 10 items)
- Fisher–Yates shuffle on every correct click to increase difficulty
- Scoreboard with current score and highest score tracking
- Win state at 10/10 unique clicks and quick restart
- Loading and error states for network requests
- Deployed automatically to GitHub Pages via GitHub Actions

---

## Tech Stack

- React 18 (Vite + `@vitejs/plugin-react`)
- Vite 5 build and dev server
- ESLint with React/React Hooks plugins
- `uuid` for stable per-session keys
- GitHub Actions for CI/CD
- GitHub Pages for static hosting
- Data: NASA APOD API ([docs](https://api.nasa.gov))

Key files:

- `src/App.jsx` — app shell and state orchestration
- `src/components/GameBoard.jsx` — data fetching, shuffle, click handling
- `src/components/ScoreBoard.jsx` — scores and win state UI
- `src/components/Card.jsx` — image card component
- `vite.config.js` — Vite config with `base: '/memory-card/'` for Pages
- `.github/workflows/deploy.yml` — build and deploy pipeline

---

## Project Structure

```
.
├─ src/
│  ├─ components/
│  │  ├─ Card.jsx
│  │  ├─ GameBoard.jsx
│  │  └─ ScoreBoard.jsx
│  ├─ assets/
│  │  └─ NASA_logo.svg
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ App.css
│  └─ index.css
├─ public/
├─ index.html
├─ vite.config.js
├─ package.json
└─ .github/workflows/deploy.yml
```

---

## Local Development

Requirements:

- Node.js 18+ (or 20+ recommended)
- A NASA API key from https://api.nasa.gov

1) Install dependencies

```bash
npm install
```

2) Create an environment file with your API key

Create `.env.local` (or `.env`) in the project root:

```bash
VITE_NASA_API_KEY=your_api_key_here
```

3) Start the dev server

```bash
npm run dev
```

App will be available at http://localhost:5173

Optional:

```bash
npm run build   # production build
npm run preview # preview the built app
npm run lint    # lint the codebase
```

---

## Deployment (GitHub Pages via Actions)

This repo ships with a ready-to-use CI/CD pipeline that builds on pushes to `main` and deploys to GitHub Pages.

1) Configure repository secrets

- Add `VITE_NASA_API_KEY` in: Settings → Secrets and variables → Actions → New repository secret

2) Ensure Pages is served by GitHub Actions

- Settings → Pages → Build and deployment → Source: “GitHub Actions”

3) Verify `vite.config.js` base path

- If your repo name is not `memory-card`, set `base: '/<your-repo>/'`

4) Push to `main`

- The workflow at `.github/workflows/deploy.yml` will build and publish to Pages

Your site will be available at `https://<your-username>.github.io/<repo>/`.

---

## How It Works

- On mount, `GameBoard.jsx` fetches 10 APOD entries via `fetch('https://api.nasa.gov/planetary/apod?...&count=10')` using `import.meta.env.VITE_NASA_API_KEY`.
- Each image is assigned a UUID key. Clicking a new (not yet clicked) image increments the score and triggers a Fisher–Yates shuffle. Clicking a duplicate resets the score, and the highest score is preserved.
- When the score reaches 10, a win state is shown with a restart button.

---

## React Skills Gained

- State management with `useState` across parent/child components
- Side effects with `useEffect` for data fetching and reacting to score changes
- Rendering lists with stable keys and immutability-friendly updates
- Implementing the Fisher–Yates shuffle without mutating original state
- Conditional rendering for loading, error, and win states
- Environment variables with Vite (`import.meta.env`) and SPA deployment base paths
- CI/CD for React apps with GitHub Actions and GitHub Pages

---

## Roadmap

- Extract API logic to a reusable custom hook (e.g. `useNasaApod`)
- Filter out non-image APOD entries (`media_type !== 'image'`)
- Persist highest score using `localStorage`
- Add basic tests and improve accessibility (alt text, keyboard support)

---

## Acknowledgments

- Data courtesy of NASA APOD API — see terms at https://api.nasa.gov
