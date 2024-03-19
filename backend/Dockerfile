From node:latest AS build

RUN apt update && npm install -g @babel/cli @babel/core

WORKDIR /usr/src/app

COPY package.json package-lock.json .

RUN npm install

RUN chmod +x node_modules/.bin/babel

COPY . .

RUN npm run build

From node:latest AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/routes ./routes
COPY --from=build /usr/src/app/models ./models

ENV port=5555
ENV MONGODBURL=mongodb://localhost:27017/mydatabase
CMD ["node", "dist/index.js"]

