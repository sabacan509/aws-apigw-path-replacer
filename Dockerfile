FROM node:10.16.3-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm && \
    npm install

ENTRYPOINT /app/entrypoint.sh