FROM node:16 AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/dist/main.js .

ENV IMDB_USER_ID ""
ENV NCORE_USERNAME ""
ENV NCORE_PASSWORD ""
ENV QBITTORRENT_URL ""
ENV QBITTORRENT_USERNAME ""
ENV QBITTORRENT_PASSWORD ""


LABEL org.opencontainers.image.source https://github.com/tasztalos69/imdb-torrenter
LABEL org.opencontainers.image.authors Kiss Benedek Máté
LABEL org.opencontainers.image.title IMDB Torrenter

CMD [ "node", "main.js" ]