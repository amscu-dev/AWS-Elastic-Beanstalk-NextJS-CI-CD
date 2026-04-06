#!/bin/bash
set -euo pipefail

MODE=${1:-all}

if [ "$MODE" = "all" ]; then
  echo "Running gitleaks on entire codebase..."
  docker run --rm -v "$(pwd):/source" \
    -w /source \
    ghcr.io/gitleaks/gitleaks:latest \
    detect \
    --verbose

elif [ "$MODE" = "staged" ]; then
  echo "Running gitleaks on staged files..."
  docker run --rm -v "$(pwd):/source" \
    -w /source \
    ghcr.io/gitleaks/gitleaks:latest \
    protect \
    --staged \
    --verbose

else
  echo "Usage: ./gitleaks.sh [all|staged]"
  exit 1
fi
