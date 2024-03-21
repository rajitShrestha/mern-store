pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_REPO = 'public.ecr.aws/m7c1j1n8/book-manager'
        DOCKER_IMAGE_TAG = 'latest'
        GIT_REPO_URL = 'https://github.com/rajitShrestha/Book-Store-MERN-Stack.git'
        AWS_CREDENTIALS_ID = 'aws-cred'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'docker-container', url: "${GIT_REPO_URL}"
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        // Build Docker image
                        sh 'docker build -t ${ECR_REPO}:${DOCKER_IMAGE_TAG} .'
                        // Push Docker image to ECR
                        sh 'aws ecr-public get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin public.ecr.aws/m7c1j1n8'
                        sh 'docker push ${ECR_REPO}:${DOCKER_IMAGE_TAG}'
                    }
                }
            }
        }
    }
}
