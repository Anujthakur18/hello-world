#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API_PORT="${PORT:-5000}"
UI_PORT="${PORT_UI:-3000}"

need_install() {
  [[ ! -d "$1/node_modules" ]]
}

echo "Netflix clone — fastest local start"
echo "  API  http://localhost:${API_PORT}"
echo "  UI   http://localhost:${UI_PORT}"
echo

if need_install "$ROOT/netflix-api"; then
  echo "Installing API dependencies..."
  (cd "$ROOT/netflix-api" && npm install)
fi

if need_install "$ROOT/netflix-ui"; then
  echo "Installing UI dependencies..."
  (cd "$ROOT/netflix-ui" && npm install)
fi

if curl -sf "http://127.0.0.1:${API_PORT}/health" >/dev/null 2>&1; then
  echo "API already running on port ${API_PORT}"
else
  echo "Starting API..."
  (cd "$ROOT/netflix-api" && npm start) &
  API_PID=$!
  for _ in $(seq 1 20); do
    if curl -sf "http://127.0.0.1:${API_PORT}/health" >/dev/null 2>&1; then
      break
    fi
    sleep 0.3
  done
fi

if curl -sf "http://127.0.0.1:${UI_PORT}" >/dev/null 2>&1; then
  echo "UI already running on port ${UI_PORT}"
else
  echo "Starting UI..."
  (cd "$ROOT/netflix-ui" && BROWSER=none npm start) &
  UI_PID=$!
fi

echo
echo "Open http://localhost:${UI_PORT}"
echo "First visit: Sign In (header) → enter email → Get Started → password (6+ chars) → Sign Up"
echo "Press Ctrl+C to stop processes started by this script."
echo

cleanup() {
  if [[ -n "${API_PID:-}" ]] && kill -0 "$API_PID" 2>/dev/null; then
    kill "$API_PID" 2>/dev/null || true
  fi
  if [[ -n "${UI_PID:-}" ]] && kill -0 "$UI_PID" 2>/dev/null; then
    kill "$UI_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM
wait
