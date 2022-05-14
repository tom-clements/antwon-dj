# syntax=docker/dockerfile:1.3.1

FROM antwon-dj/node-env:1.0.0

WORKDIR /client

COPY .yarn .yarn/
COPY .yarnrc.yml .yarnrc.yml 
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install
