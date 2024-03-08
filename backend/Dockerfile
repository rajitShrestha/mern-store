FROM node:latest AS build

RUN npm install -g @babel/cli @babel/core

COPY . /usr/src/app

# Change directory to the backend directory
WORKDIR /usr/src/app/

# Install npm dependencies
RUN npm install

RUN chmod +x node_modules/.bin/babel

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:latest AS production

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/models ./models
COPY --from=build /usr/src/app/routes ./routes

# Expose port 3000 (or the port your application listens on)
EXPOSE 5555

# Set default environment variables
ENV PORT=5555
ENV MONGODBURL=mongodb://localhost:27017/mydatabase

# Start the Node.js application
CMD ["node", "dist/index.js"]

