# Rebuild or extend this project (fast checklist)

The fastest way to **have** the project is to clone this repo and run [QUICKSTART.md](../QUICKSTART.md). Use this page if you want to **rebuild the same app** or add a feature without wandering the tree.

## Fastest rebuild (clone, don’t rewrite)

```bash
git clone <your-fork-url>
cd hello-world
git checkout cursor/netflix-clone-3a7b   # or main after merge
npm run setup
npm start
```

Open http://localhost:3000 and sign up. That is the entire “make it” path.

## If you are following the original tutorial from scratch

Do this instead of Firebase + Mongo setup:

1. Create `netflix-ui` with Create React App (`npx create-react-app netflix-ui`).
2. Install: `react-router-dom react-redux @reduxjs/toolkit axios styled-components react-icons`.
3. Copy pages/components from this repo (do not retype them).
4. Copy `src/utils/auth.js` and `src/hooks/useAuth.js` instead of Firebase.
5. Create `netflix-api` with `npm init` and `express cors`. Copy `server.js`, `userStore.js`, routes, and controller.
6. Point the UI at `http://localhost:5000` via `BACKEND_URL` in `src/utils/constants.js`.
7. Run API then UI. Skip Mongo until the UI works.

Copying the folders from this repo is faster and less error-prone than retyping from a video.

## Fastest feature recipes

### Add a navbar link

1. Edit the `links` array in `netflix-ui/src/components/Navbar.jsx`.
2. Add a `<Route>` in `netflix-ui/src/App.js`.
3. Create the page under `src/pages/` and wrap it with `useRequireAuth()` like `Movies.jsx`.

### Fetch a different TMDB list

Edit `fetchMovies` / `fetchDataByGenre` in `netflix-ui/src/store/index.js`. Keep `API_KEY` and `TMDB_BASE_URL` from `src/utils/constants.js`.

### Persist liked titles

```bash
export MONGO_URI="mongodb://127.0.0.1:27017/netflix"
npm run start:api
```

The API logs `DB Connection Successful` when Mongo is used.

### Change the backend URL

```bash
# netflix-ui
REACT_APP_API_URL=http://localhost:5000 npm start
```

### Verify the API without the UI

```bash
curl http://localhost:5000/health
cd netflix-api && npm test
```

## Order of work (don’t skip)

1. API `GET /health` returns JSON.
2. UI compiles on :3000.
3. Signup then Home shows posters.
4. Only then wire My List / Mongo / extra pages.

If Home has no posters, do not debug Mongo. TMDB and the browser network tab come first.
