# How to view and present this project

This clone is a **local web app**, not a published Netflix site. You represent it by running it on your laptop and walking through the browser, or by showing the GitHub repo plus screenshots if you cannot run it live.

## 1. Open it (the actual product)

On the machine where the repo is cloned:

```bash
npm run setup
npm start
```

In **Chrome or Edge**, open:

**http://localhost:3000**

That is the project. There is no extra “preview” tool. Do not open the `.jsx` files as the demo — those are source. The demo is the running UI.

| You want to show… | Open this |
| --- | --- |
| App (what users see) | http://localhost:3000 |
| API alive | http://localhost:5000/health |
| Code | this GitHub repo in the editor or on github.com |
| Architecture talking points | [HOW-IT-WORKS.md](HOW-IT-WORKS.md) |

If the page does not load, another program may be using port 3000/5000, or Node is not installed. See [QUICKSTART.md](../QUICKSTART.md).

**Full screen for a demo:** F11 (Windows/Linux) or browser presentation mode. Zoom the browser to 110–125% so rows and the hero are readable on a projector.

## 2. Two-minute live demo (say this while you click)

Use a fresh browser profile or click the red power icon first so you start logged out.

1. **Login screen** — “This is a Netflix-style clone. Auth is local in the browser, so I can sign up without Firebase.”
2. Click **Sign In** (header) → **Signup**. Enter any email and a password of 6+ characters → **Sign Up**.
3. **Home** — “Catalogs come from TMDB. The hero, rows, and hover cards are React + styled-components.”
4. **Movies** and **TV Shows** — change the genre dropdown once.
5. Hover a poster → plus icon — “That POST goes to my Express API on port 5000.”
6. **My List** — show the saved title.
7. **Play** — sample trailer player, then back.
8. Red power icon → login again with the same email/password.

That sequence is the whole product story: UI, auth, live data, backend, persistence.

## 3. Slide outline (if you need slides)

Keep 5 slides. Put a live demo in the middle, not at the end when you are out of time.

1. **Title** — Netflix clone (educational). Your name. Stack: React, Redux Toolkit, Express, TMDB.
2. **Problem / goal** — practice a production-shaped frontend: routing, auth gate, carousels, a small API.
3. **Architecture** — `netflix-ui` (port 3000) talks to TMDB and to `netflix-api` (port 5000). Auth = `localStorage`. Likes = memory or Mongo.
4. **Live demo** — the two-minute flow above (or screenshots of Home / My List if the network is blocked).
5. **What I would add next** — real search, JWT auth, Mongo by default, deploy UI + API.

One line you should say: **this is not affiliated with Netflix; layout and assets are for learning only.**

## 4. If you cannot run it live

Show, in this order:

1. GitHub repo README and `QUICKSTART.md`
2. Screenshots of Signup, Home, Movies, My List (save them from your own run, or reuse the ones from the development walkthrough)
3. A 30-second screen recording of signup → home rows → My List

Record with your OS tool (Windows Game Bar, macOS Screenshot toolbar, or OBS). Start recording after `npm start` has compiled.

## 5. What interviewers / classmates usually ask

| Question | Short answer |
| --- | --- |
| Why two folders? | UI and API so likes are not stuck in React state. |
| Why no Firebase? | Fastest local setup; same signup/login UX as the tutorial. |
| Where do movies come from? | TMDB HTTP API, Redux thunks in `src/store`. |
| Why is My List empty after restart? | Default store is in-memory; set `MONGO_URI` to persist. |
| Is this Netflix? | No. Educational clone of the look and flow. |

## 6. Viewing it from this Cursor cloud session

The app is already started in the cloud workspace on ports 3000 and 5000. That is **inside the agent environment**, not on your home laptop.

To represent it **in class or an interview**, clone the repo on your computer, run `npm run setup && npm start`, and demo **http://localhost:3000** in your browser. That is the version other people can see on your screen.
