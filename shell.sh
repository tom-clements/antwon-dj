#!/bin/bash
# Shell into a specific development service through Docker
#
# Usage:
#
# 1. Running a command inline:
# 
#   ./shell.sh client yarn test
#
# 2. Opening an interactive TTY (where further commands can be executed)
#
#   ./shell.sh backend

set -e

SCRIPT_PATH=$(dirname "$(realpath -s "$BASH_SOURCE")")

cd $SCRIPT_PATH/docker/compositions/antwon-dj.dev


if [ -z "$1" ]
then
    echo "You need to provide at least a service to target. E.g."
    echo "    ./shell.sh backend"
    echo
    echo "Alternatively, a series of arguments to pass to compose run. E.g."
    echo "    ./shell.sh client yarn test"
    echo
    exit 1
fi

if [ -z "$2" ]
then
    COMPOSE_SERVICE="$1"
    echo "Executing 'docker-compose run $COMPOSE_SERVICE /bin/sh'..."
    DOCKER_BUILDKIT=1 docker-compose run $COMPOSE_SERVICE "/bin/sh"
else
    ARGUMENTS="${@:1}"
    echo "Executing 'docker-compose run $ARGUMENTS'..."
    DOCKER_BUILDKIT=1 docker-compose run $ARGUMENTS
fi
