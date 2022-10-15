FROM node:slim

WORKDIR /var/www/html/app/

COPY package*.json ./

RUN npm install

COPY . /app

CMD [ "npm", "run", "dev"]