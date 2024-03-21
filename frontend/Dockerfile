FROM node:latest AS build

WORKDIR /app

RUN npm install -g vite

COPY package.json package-lock.json .

RUN npm install

# ENV REACT_APP_BACKEND_URL=http://54.162.151.112:5555

COPY . .

RUN vite build

From nginx:latest AS production

COPY --from=build /app/dist/index.html /usr/share/nginx/html/

COPY --from=build /app/dist/assets /usr/share/nginx/html/assets/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
