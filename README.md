## Project Architecture

- The project has been restructured into a microservice architecture with backend and frontend directories.

### Backend Deployment

```bash
# Build Process:
# Refer to the package.json file for the build process.
# Create a .env file for MongoDB connection, specifying the port number and MongoDB URL. Adjust the MongoDB URL accordingly.

# Installation:
# Install Node.js and npm (Node Package Manager) using nvm for better version control.
# Run npm install to install all required packages.
# Install Babel CLI and Babel Core globally using npm install -g @babel/cli @babel/core.

# Configuration for Linux/Ubuntu:
# Ensure the babel file is executable by running:
chmod +x node_modules/.bin/babel

# Build Process:
# Run npm run build to create a build artifact.
# Execute the built file by running:
node dist/index.js
```

### Frontend Deployment

```bash
# Build Process:
# Refer to the package.json file for the build process.
# Install the Vite package for the build process.

# Configuration:
# Before running the build process, update the config.js file with the backend URL.
   
# Building and Deployment:
# Run vite build to create build files.
# Copy the generated build files located in dist/* to /var/www/html on the Linux/Ubuntu machine.
   
# Nginx Setup:
# Install Nginx service.
# Configure the Nginx configuration file to point to the index.html file located in /var/www/html.
# Restart the Nginx service.

# Accessing the Service:
# Access the service via the web using the configured Nginx setup.
```

### Setup Instruction:
```bash
# Backend Commands
npm install
npm install -g @babel/cli @babel/core
chmod +x node_modules/.bin/babel
npm run build
node dist/index.js
```

```bash
# Frontend Commands
npm install vite
vite build
sudo systemctl restart nginx
```
