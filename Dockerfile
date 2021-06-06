FROM node:14-alpine

WORKDIR /app

RUN apk update && npm install -g npm
CMD ["npm","ci"]

ENTRYPOINT /app/entrypoint.sh