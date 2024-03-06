Steps for deploying to an EC2 machine as an microservice-architecture
Project architecture:
- The project has been adjusted to a microservice architecture
- The project has backend and frontend directory

Backend deployment:
- Refer the package.json file for the build process
- For mongodb connection, .env file has been created with the port number to listen on and the mongodb_url address: change the url of the mongdob accordingly
- Install nodejs latest version and npm accordingly: use nvm for installation 
- Run "npm install" for installing all the required packages
- Run "npm install -g @babel/cli @babel/core" - required for the buil process
- When running the service in Linux/Ubuntu system: "chmod +x node_modules/.bin/babel" - need to make the babel file executable for the build process to work
- Run "npm run build" - for creating a build artifact
- Run "node dist/index.js" - dist is the destination folder created when running "npm run build" and has the build file index.js

Forntend deployment:
- Refer the package.json file for the build process
- Install the vite package for build process
- Before running the build process, config.js file has the backend_url address, change the backend_url address to the host_name/ip of the machine hosting the backend service accordingly
- Run vite build
- Copy the build files created in dist/* to /var/www/html location in Linux/Ubuntu machine
- Install Nginx service
- Setup nginx conf file to point to the index.html file located in /var/www/html
- Restart nginx service
- Access the service on the web
--
