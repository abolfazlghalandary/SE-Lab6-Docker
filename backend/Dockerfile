FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --build-from-source=false

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
