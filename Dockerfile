FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build