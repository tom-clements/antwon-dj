# syntax=docker/dockerfile:1.3.1

FROM antwon-dj/node-env:1.0.0

WORKDIR /client

COPY .yarn .yarn/
COPY .yarnrc.yml .yarnrc.yml 
COPY package.json package.json
COPY yarn.lock yarn.lock

COPY .storybook .storybook/
COPY .env.local .env.local
COPY .eslintrc .eslintrc
COPY jest.config.js jest.config.js
COPY next-env.d.ts next-env.d.ts
COPY next.config.js next.config.js
COPY tsconfig.json tsconfig.json

RUN yarn install
