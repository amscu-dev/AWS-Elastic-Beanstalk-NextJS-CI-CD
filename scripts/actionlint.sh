#!/bin/bash
set -euo pipefail

MODE=${1:-all}

if [ "$MODE" = "all" ]; then
  echo "Running actionlint on all workflow files..."
  docker run --rm -v "$(pwd):/source" \
    -w /source \
    rhysd/actionlint:latest \
    -color \
    -config-file .github/linters/actionlint.yaml \
    --verbose

elif [ "$MODE" = "staged" ]; then
  echo "Running actionlint on staged workflow files..."
  STAGED_WORKFLOWS=$(git diff --cached --name-only | grep -E '^\.github/workflows/.*\.(yml|yaml)$' || true)
  echo "Staged workflow files:"
  echo "${STAGED_WORKFLOWS:-(none)}"
  if [ -n "$STAGED_WORKFLOWS" ]; then
    echo "$STAGED_WORKFLOWS" | xargs docker run --rm -v "$(pwd):/source" \
      -w /source \
      rhysd/actionlint:latest \
      -color \
      -config-file .github/linters/actionlint.yaml \
      --verbose
  else
    echo "No workflow files staged, skipping actionlint."
  fi

else
  echo "Usage: ./actionlint.sh [all|staged]"
  exit 1
fi
