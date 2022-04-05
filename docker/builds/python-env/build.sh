#!/bin/bash

set -e

IMAGE_NAME=antwon-dj/python-env
IMAGE_VERSION=1.0.0
IMAGE_TAG=$IMAGE_NAME:$IMAGE_VERSION

DOCKER_BUILDKIT=1 \
    docker build . \
    -t $IMAGE_TAG
