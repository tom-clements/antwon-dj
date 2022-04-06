#!/bin/bash

set -e

SCRIPT_PATH=$(dirname "$(realpath -s "$BASH_SOURCE")")

cd $SCRIPT_PATH/docker/compositions/antwon-dj.dev

DOCKER_BUILDKIT=1 docker-compose up $1
