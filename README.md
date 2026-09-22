# Netflix Clone

Streaming UI clone based on [Boss-Coder-Academy/Netflix](https://github.com/Boss-Coder-Academy/Netflix).

The app has two parts:

- `netflix-ui` — React app (signup, login, home, movies, TV shows, my list, player)
- `netflix-api` — Express API for liked movies

Accounts are stored in the browser (no Firebase project required). Liked movies are stored in memory by default, or in MongoDB if `MONGO_URI` is set and reachable. Movie catalogs come from [TMDB](https://www.themoviedb.org/).

## Run locally

You need Node.js 18+.

```bash
cd netflix-api
npm install
npm start
```

In a second terminal:

```bash
cd netflix-ui
npm install
npm start
```

Then open http://localhost:3000, create an account on `/signup`, and browse titles.

## Optional configuration

| Variable | Where | Default |
| --- | --- | --- |
| `MONGO_URI` | API | `mongodb://127.0.0.1:27017/netflix` (falls back to memory if Mongo is down) |
| `PORT` | API | `5000` |
| `REACT_APP_API_URL` | UI | `http://localhost:5000` |
| `REACT_APP_TMDB_API_KEY` | UI | bundled demo key |

## Notes

This is a learning project. Netflix is a trademark of Netflix, Inc. Assets and layout are for educational use only.
