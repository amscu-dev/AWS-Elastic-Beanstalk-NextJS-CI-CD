#!/bin/bash
set -euo pipefail

echo "🔧 [DEBUG] ggshield.sh pornit"
echo "🔧 [DEBUG] Argumente primite: $@"
echo "🔧 [DEBUG] Working directory: $(pwd)"

# Load GITGUARDIAN_API_KEY din .env
if [ -f .env ]; then
  echo "🔧 [DEBUG] .env gasit, incarc variabilele..."
  export $(grep -v '^#' .env | grep 'GITGUARDIAN_API_KEY' | xargs)
else
  echo "🔧 [DEBUG] .env NU a fost gasit in $(pwd)"
fi

if [ -z "${GITGUARDIAN_API_KEY:-}" ]; then
  echo "❌ GITGUARDIAN_API_KEY lipsește din .env"
  exit 1
fi

echo "🔧 [DEBUG] API Key incarcat: ${GITGUARDIAN_API_KEY:0:6}***" # primele 6 caractere doar
echo "🔧 [DEBUG] Docker image: gitguardian/ggshield"
echo "🔧 [DEBUG] Stdin primit:"
cat - | tee /dev/stderr | docker run --rm -i \
  -e GITGUARDIAN_API_KEY \
  -v "$(pwd):/data" \
  -w /data \
  gitguardian/ggshield \
  secret scan pre-push \
  --verbose \
  "$@"

echo "✅ [DEBUG] ggshield scan finalizat cu succes"
