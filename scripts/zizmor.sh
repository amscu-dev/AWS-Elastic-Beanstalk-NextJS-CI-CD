#!/bin/bash
set -euo pipefail

MODE=${1:-offline}

if [ "$MODE" = "online" ]; then
  echo "Running zizmor in online mode..."
  docker run --rm -v "$(pwd):/src" \
    -e GH_TOKEN="$(gh auth token)" \
    -w /src \
    ghcr.io/zizmorcore/zizmor:latest \
    --config .github/linters/zizmor.yaml \
    .github/workflows/
elif [ "$MODE" = "offline" ]; then
  echo "Running zizmor in offline mode..."
  docker run --rm -v "$(pwd):/src" \
    -w /src \
    ghcr.io/zizmorcore/zizmor:latest \
    --offline \
    --config .github/linters/zizmor.yaml \
    .github/workflows/

elif [ "$MODE" = "staged" ]; then
  echo "Running zizmor on staged workflow files..."
  STAGED_WORKFLOWS=$(git diff --cached --name-only | grep -E '^\.github/workflows/.*\.(yml|yaml)$' || true)
  echo "Staged workflow files:"
  echo "${STAGED_WORKFLOWS:-(none)}"
  if [ -n "$STAGED_WORKFLOWS" ]; then
    echo "$STAGED_WORKFLOWS" | xargs docker run --rm -v "$(pwd):/src" \
      -w /src \
      ghcr.io/zizmorcore/zizmor:latest \
      --offline \
      --config .github/linters/zizmor.yaml
  else
    echo "No workflow files staged, skipping zizmor."
  fi

else
  echo "Usage: ./zizmor.sh [online|offline]"
  exit 1
fi
