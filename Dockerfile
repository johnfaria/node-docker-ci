FROM node:15.1.0-alpine

WORKDIR /src

ADD package.json /src

RUN npm install --silent

ADD . /src

RUN npm run build

CMD npm run start
