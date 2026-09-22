# How this Netflix clone is built

Use this page when you need to remember what each folder does, not when you only want to run the app. For running, see [QUICKSTART.md](../QUICKSTART.md).

## Layout

```
.
├── QUICKSTART.md          ← run it in one minute
├── package.json           ← npm run setup / npm start
├── scripts/dev.sh         ← starts API + UI together
├── netflix-ui/            ← React (Create React App)
│   └── src/
│       ├── pages/         ← Login, Signup, Home, Movies, TV, My List, Player
│       ├── components/    ← Navbar, sliders, cards
│       ├── store/         ← Redux + TMDB fetches
│       ├── hooks/useAuth.js
│       └── utils/auth.js  ← localStorage auth (no Firebase)
└── netflix-api/           ← Express liked-list API
    ├── server.js
    ├── userStore.js       ← memory, or Mongo if MONGO_URI is set
    └── controllers/
```

## User flow

1. Unauthenticated users hitting `/` are sent to `/login`.
2. Signup / login writes `{ email, uid }` to `localStorage` (`netflix_clone_session`).
3. Home, Movies, and TV Shows call TMDB through Redux (`netflix-ui/src/store/index.js`).
4. Hover a card → plus icon POSTs `{ email, data }` to `http://localhost:5000/api/user/add`.
5. My List GETs `/api/user/liked/:email`.
6. Player plays the bundled sample video in `netflix-ui/src/assets/video.mp4`.

## Routes (UI)

| Path | Page |
| --- | --- |
| `/signup` | Create account |
| `/login` | Sign in |
| `/` | Home (hero + rows) |
| `/movies` | Movies + genre select |
| `/tv` | TV shows + genre select |
| `/mylist` | Liked titles |
| `/player` | Full-screen sample video |

## API

| Method | Path | Body / params |
| --- | --- | --- |
| GET | `/health` | — |
| GET | `/api/user/liked/:email` | email in URL |
| POST | `/api/user/add` | `{ email, data }` |
| PUT | `/api/user/remove` | `{ email, movieId }` |

`data` is the card object: `{ id, name, image, genres }`.

## Auth (why there is no Firebase)

The original tutorial used a shared Firebase project. This repo uses the same function names (`createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `onAuthStateChanged`, `signOut`) in `netflix-ui/src/utils/auth.js`, backed by `localStorage`. That is the fastest way to get signup working on a fresh machine.

## Movie data

TMDB public HTTP API. Default key is in `netflix-ui/src/utils/constants.js` (the key shipped with the tutorial). Override with `REACT_APP_TMDB_API_KEY` if you have your own.

## Optional MongoDB

Set `MONGO_URI` to a value starting with `mongodb://` or `mongodb+srv://` before starting the API. If it is unset or invalid, liked titles stay in process memory.

## Stack

- React 18, React Router 6, Redux Toolkit, styled-components, axios
- Express, CORS, optional Mongoose
