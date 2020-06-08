FROM node:12-alpine

RUN mkdir -p /usr/src/myspotio
WORKDIR /usr/src/myspotio

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/myspotio/
RUN npm install

RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD [ "npm", "start" ]
