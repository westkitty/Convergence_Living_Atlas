#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8765}"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/convergence-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:$PORT/index.html" >/dev/null; then
    break
  fi
  sleep 0.2
done

curl -fsS "http://127.0.0.1:$PORT/assets/covers.webp" >/tmp/convergence-covers.webp
curl -fsS "http://127.0.0.1:$PORT/assets/generated/hero.webp" >/tmp/convergence-hero.webp
curl -fsS "http://127.0.0.1:$PORT/assets/generated/atlas-bg.webp" >/tmp/convergence-atlas-bg.webp
curl -fsS "http://127.0.0.1:$PORT/assets/generated/converg/event-e1.webp" >/tmp/convergence-event-e1.webp
curl -fsS "http://127.0.0.1:$PORT/assets/generated/converg/loc-earth.webp" >/tmp/convergence-loc-earth.webp
test -s /tmp/convergence-covers.webp
test -s /tmp/convergence-hero.webp
test -s /tmp/convergence-atlas-bg.webp
test -s /tmp/convergence-event-e1.webp
test -s /tmp/convergence-loc-earth.webp

BROWSER=""
for candidate in google-chrome google-chrome-stable chromium chromium-browser; do
  if command -v "$candidate" >/dev/null 2>&1; then
    BROWSER="$candidate"
    break
  fi
done

if [[ -z "$BROWSER" ]]; then
  echo "No supported headless Chromium binary found." >&2
  exit 2
fi

dump() {
  local hash="$1"
  local out
  out="$("$BROWSER" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --virtual-time-budget=1800 \
    --dump-dom "http://127.0.0.1:$PORT/index.html#$hash" 2>/dev/null || true)"
  if [[ -z "$out" ]]; then
    echo "Headless browser returned no DOM for #$hash" >&2
    return 1
  fi
  printf '%s' "$out"
}


dump_mobile() {
  local hash="$1"
  local out
  out="$("$BROWSER" \
    --headless=new \
    --no-sandbox \
    --disable-gpu \
    --disable-dev-shm-usage \
    --window-size=390,844 \
    --user-agent='Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1' \
    --virtual-time-budget=1800 \
    --dump-dom "http://127.0.0.1:$PORT/index.html#$hash" 2>/dev/null || true)"
  if [[ -z "$out" ]]; then
    echo "Mobile headless browser returned no DOM for #$hash" >&2
    return 1
  fi
  printf '%s' "$out"
}

echo "SMOKE: overview"
OVERVIEW="$(dump overview)"
grep -q 'Six covers. One widening architecture.' <<<"$OVERVIEW"
grep -q 'Enter relationship atlas' <<<"$OVERVIEW"
grep -q 'generated-hero-art' <<<"$OVERVIEW"
grep -q 'Visual archive' <<<"$OVERVIEW"

echo "SMOKE: book"
BOOK="$(dump book/1)"
grep -q 'asset-driven dossier' <<<"$BOOK"
grep -q 'People introduced' <<<"$BOOK"

echo "SMOKE: timeline"
TIMELINE="$(dump timeline)"
grep -q 'Time changes the network' <<<"$TIMELINE"
grep -q 'event-e1.webp' <<<"$TIMELINE"

echo "SMOKE: events"
EVENTS="$(dump events)"
grep -q 'event-e1.webp' <<<"$EVENTS"
grep -q 'event-e13.webp' <<<"$EVENTS"

echo "SMOKE: groups"
GROUP_DOM="$(dump groups)"
grep -q 'group-team.webp' <<<"$GROUP_DOM"
grep -q 'group-angels.webp' <<<"$GROUP_DOM"

echo "SMOKE: archive"
ARCHIVE="$(dump archive)"
grep -q 'loc-earth.webp' <<<"$ARCHIVE"
grep -q 'obj-amulet.webp' <<<"$ARCHIVE"
grep -q 'theme-loyalty.webp' <<<"$ARCHIVE"

echo "SMOKE: atlas"
ATLAS="$(dump atlas)"
grep -q 'Relationship atlas' <<<"$ATLAS"
grep -q 'network' <<<"$ATLAS"
grep -q 'gdrive-atlas-art' <<<"$ATLAS"
grep -q 'generated-atlas-scene' <<<"$ATLAS"

echo "SMOKE: iPhone portrait overview"
IPHONE_OVERVIEW="$(dump_mobile overview)"
grep -q 'phone-shell' <<<"$IPHONE_OVERVIEW"
grep -q 'mobile-nav' <<<"$IPHONE_OVERVIEW"
grep -q 'generated-hero-art' <<<"$IPHONE_OVERVIEW"

echo "SMOKE: iPhone portrait atlas"
IPHONE_ATLAS="$(dump_mobile atlas)"
grep -q 'phone-shell' <<<"$IPHONE_ATLAS"
grep -q 'atlas-panel-toggle' <<<"$IPHONE_ATLAS"
grep -q 'atlas-panel collapsed' <<<"$IPHONE_ATLAS"
grep -q 'gdrive-atlas-art' <<<"$IPHONE_ATLAS"

echo "BROWSER + MOBILE SMOKE PASS"
