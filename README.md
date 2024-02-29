Notes:
Branch: Beanstalk-deploy
- This branch has the code modified to suit the deployment to the aws beanstalk service
- Steps for the deployment process:
     - Clone the the branch url to the local machine
     - Root dir has the frontend dir and backend service files
     - Frontend dir contains the build image of the react + vite project: build using npm run build
     - For backend services, 'dist dir' has the build file of entry point 'index.js'
     - .env file contains the environment variable for mongodb URL and the port to run it on
     - For deploying to the beanstalk service, zip all the contents of a backend dir
     - Set the environment variables PORT and MONGODBURL in the beanstalk environment var configuration
     - Upload the zip file to your beanstalk environment
     - Access the service from the beanstalk domain url
