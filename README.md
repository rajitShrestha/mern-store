### Running a container from a Docker image:

#### Backend Image:

```bash
# Build the backend image
docker build -t backend-image .

# Run the backend container with environment variables and port mapping
docker run -e PORT=5555 \
           -e "MONGODBURL=mongodb+srv://rajitshrestha646:password@cluster0.e5tlk4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0cl" \
           -d -p 5555:5555 \
           --name backend backend-image

# Build the frontend image
docker build -t frontend-image .

# Run the frontend container with port mapping
docker run -d -p 80:80 --name react-front frontend-image

# Run containers defined in the Docker Compose file
docker-compose up -d
