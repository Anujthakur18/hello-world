# Quick start (fastest path)

This is the shortest path to run the clone on your machine.

## Prerequisites

- Node.js 18 or newer (`node -v`)
- npm (`npm -v`)
- Git

You do **not** need Firebase, MongoDB, or a TMDB account for the default demo.

## 60-second run

From the repo root:

```bash
npm run setup
npm start
```

Then open **http://localhost:3000**

| Service | URL | What it does |
| --- | --- | --- |
| UI | http://localhost:3000 | Signup, login, browse, player |
| API | http://localhost:5000 | Liked-list (`/health` should return `{"ok":true,...}`) |

If `npm start` says a service is already running, that is fine — it reuses ports 3000 and 5000.

## Create an account (first time)

1. You land on **Login**. Click **Sign In** in the header (it opens `/signup`).
2. Enter an email → **Get Started**.
3. Enter a password of at least 6 characters → **Sign Up**.
4. Home loads with TMDB posters. Use **Movies**, **TV Shows**, **My List**, **Play**, and the red power icon to log out.

Accounts are stored in this browser only (`localStorage`). Liked titles live in API memory until the API process restarts.

## Two terminals (if you prefer)

```bash
cd netflix-api && npm install && npm start
```

```bash
cd netflix-ui && npm install && npm start
```

## Stop

In the terminal that ran `npm start`, press **Ctrl+C**.

If something is still bound to a port:

```bash
# Linux / macOS
lsof -i :3000
lsof -i :5000
```

Stop that process by PID. Do not use `pkill -f`.

## Common mistakes

| Symptom | Fix |
| --- | --- |
| Blank login loop after signup | Password must be 6+ characters |
| Home has no posters | Check internet access to `api.themoviedb.org` |
| My List empty after restart | Default storage is in-memory; start the API again and re-add titles, or set `MONGO_URI` |
| UI cannot add to list | API must be on port 5000 (`curl http://localhost:5000/health`) |
| Port already in use | Reuse the running server, or free that port |

## Show this to someone else

The project is the running site at **http://localhost:3000**, not the source files. Full demo script and slide outline: [docs/PRESENT.md](docs/PRESENT.md).

## Next reading

- [View and present](docs/PRESENT.md)
- [How the project is built](docs/HOW-IT-WORKS.md)
- [Rebuild / extend checklist](docs/RECREATE.md)
