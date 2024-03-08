Running a container from a docker image:
- Backend-image:
  - cd to backend dir
  - Locate the Dockerfile inside it
  - Make the changes to the file accordingly for the port and mongodburl
  - Create a dockerimage:
      - Run the command "docker build -t backend-image ."
  - Run the docker container from the dockerimage:
      - Run the command "docker run -e PORT=5555 -e "MONGODBURL=mongodb+srv://rajitshrestha646:password@cluster0.e5tlk4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cl" -d -p 5555:5555 --name backend backend-image
- Frontend-image:
  - cd to frontend dir
  - Locate the Dockerfile inside it
  - Make the custom changes according your preference
  - Set the backend_url(host-ip where your backend service is running) in the config.js file in root dir
  - For dynamically adjusting the value of backend_url during docker container run-time, unmakr "# ENV REACT_APP_BACKEND_URL=http://3.85.8.74:5555" section and make change the config.js file to access the env variable accordingly
  - Create a dockerimage:
      - Run the command docker run -d -p 80:80 --name react-front react-image
Notes:
- For dynamically adjusting the backend_url for connection from the frontend application
    - In the config.js file, replace the api_url value with "const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5555';"
    - Uncomment the "ENV REACT_APP_BACKEND_URL=http://3.85.8.74:5555" section in the Dockerfile
    - Create an Docker image
    - Run the command "docker run -e "REACT_APP_BACKEND_URL=your-backend-url" -d -p 80:80 --name react-front react-image

