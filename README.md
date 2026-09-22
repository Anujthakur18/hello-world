# Netflix Clone

Streaming UI clone based on [Boss-Coder-Academy/Netflix](https://github.com/Boss-Coder-Academy/Netflix).

**Start here:** [QUICKSTART.md](QUICKSTART.md)

```bash
npm run setup
npm start
```

Open http://localhost:3000 and create an account (email + password, 6+ characters).

## Docs

- [Quick start](QUICKSTART.md) — run it now
- [How it works](docs/HOW-IT-WORKS.md) — folders, routes, API, auth
- [Rebuild / extend](docs/RECREATE.md) — fastest way to remake or add features

## What is in this repo

- `netflix-ui` — React: signup, login, home, movies, TV shows, my list, player
- `netflix-api` — Express: liked movies (`GET /health` on port 5000)

Accounts stay in the browser. Liked movies stay in API memory unless `MONGO_URI` is set. Catalogs come from [TMDB](https://www.themoviedb.org/).

## Optional configuration

| Variable | Where | Default |
| --- | --- | --- |
| `MONGO_URI` | API | unset (in-memory). Use a `mongodb://` URI to persist likes |
| `PORT` | API | `5000` |
| `REACT_APP_API_URL` | UI | `http://localhost:5000` |
| `REACT_APP_TMDB_API_KEY` | UI | bundled demo key |

## Notes

This is a learning project. Netflix is a trademark of Netflix, Inc. Assets and layout are for educational use only.
