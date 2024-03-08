# Stage 1: Build the frontend in the Node.js image
FROM node:latest AS build

# Install Vite globally
RUN npm install -g vite

COPY . /app

WORKDIR /app

# Install dependencies
RUN npm install

Run  npx update-browserslist-db@latest

# Set backend URL environment variable
# ENV REACT_APP_BACKEND_URL=http://3.85.8.74:5555

# Build frontend
RUN vite build

# Stage 2: Copy built files to the production Nginx image
FROM nginx:latest AS production

COPY --from=build /app/dist/index.html /usr/share/nginx/html/
COPY --from=build /app/dist/assets /usr/share/nginx/html/assets/

# Copy Nginx configuration file
COPY react.conf /etc/nginx/conf.d/react.conf

Expose 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

