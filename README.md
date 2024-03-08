Notes: 
- For Beanstalk deploy, refer the beanstalk-deploy branch
- Docker run time commands:
- Build the docker images:
    - docker build -t backend-image . (creates a docker image named backend-image in the root directory)
    - docker build -t react-image .(creates a docker image named backend-image in the root directory)
      
  - Backend dir:
    - docker run -e PORT=5555 -e "MONGODBURL=mongodb+srv://rajitshrestha646:password@cluster0.e5tlk4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cl" --name backend -d backend-image
    - Frontend dir:
    - docker run -d -p 80:80 --name react react-image
