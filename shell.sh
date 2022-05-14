#!/bin/bash
# Shell into a specific development service through Docker
#
# Usage:
#
# 1. Running a command inline (when fixed):
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
    echo "You need to provide a service. For example, client or backend."
    exit 1
fi

# TODO fix inline script
# WRAPPED_SCRIPT="sh -c ${@:2}"
# INLINE_SCRIPT="${2:+ $WRAPPED_SCRIPT}"

echo $INLINE_SCRIPT
DOCKER_BUILDKIT=1 docker-compose run $1 /bin/sh
