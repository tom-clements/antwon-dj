#!/bin/bash

SCRIPT_PATH=$(dirname "$(realpath -s "$BASH_SOURCE")")

build_image() {
    IMAGE_PATH=$SCRIPT_PATH/$1
    echo "Building: $IMAGE_PATH"
    cd $IMAGE_PATH
    DOCKER_BUILDKIT=1 . $IMAGE_PATH/build.sh
    echo
}

echo -e "\n# Bulding antwon/dj-* images...\n"

build_image node-env
