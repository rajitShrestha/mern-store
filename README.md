Running a container from a docker image:

- Backend-image:
    - docker build -t backend-image .
    - docker run -e PORT=5555 -e "MONGODBURL=mongodb+srv://rajitshrestha646:password@cluster0.e5tlk4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cl" -d -p 5555:5555 --name backend backend-image
- Frontend-image:
    - docker build -t frontend-image .
    - docker run -d -p 80:80 --name react-front frontend-image

Running from a docker-compse file:
  - docker-compose up -d 
