# Agent notes

## Fastest local run

```bash
npm run setup
npm start
```

UI: http://localhost:3000  
API: http://localhost:5000/health

`scripts/dev.sh` starts both and skips a process if that port is already serving.

## Layout

- `netflix-ui` — Create React App. `HOST=0.0.0.0` is set in `npm start` so cloud browsers can connect.
- `netflix-api` — Express. No Mongo required.

## Tests

```bash
npm run test:api
```

Manual UI checks: signup → home posters → movies → my list → player → logout → login.

## Do not

- Do not require Firebase to run the app.
- Do not kill processes by name (`pkill -f`). Use the PID.
