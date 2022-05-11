FROM node:12

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

CMD [ "node", "." ]