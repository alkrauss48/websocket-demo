FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production

COPY index.js index.js

CMD [ "node", "index.js" ]
