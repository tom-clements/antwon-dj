#!/bin/bash
# Spin up and run all services in Docker
#
# Usage:
#
# 1. Run all services:
#
#   ./dev.sh
#
# 2. Re-build development image (if there are package manager changes)
#
# 3. Run a specific service
#
#   ./dev.sh backend

set -e

SCRIPT_PATH=$(dirname "$(realpath -s "$BASH_SOURCE")")

cd $SCRIPT_PATH/docker/compositions/antwon-dj.dev

DOCKER_BUILDKIT=1 docker-compose up $1
