pipeline {
    agent any
    
    tools{
        nodejs "nodejs"
    }

     environment {
        AWS_REGION = 'us-east-1'
        EB_APPLICATION_NAME = 'mern-project'
        EB_ENVIRONMENT_NAME = 'mern-prod-env'
        VERSION_LABEL = "1.0.${env.BUILD_NUMBER}" // Use Jenkins BUILD_NUMBER as a part of the version label
    }
    
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'beanstalk-deploy', 
                    credentialsId: 'git-jenkins', 
                    url: 'https://github.com/rajitShrestha/Book-Store-MERN-Stack.git'
            }
        }
    
        stage('Install Dependencies') {
            steps {
                sh 'npm install eslint --save-dev' // Install ESLint
            }
        }
        
        
        stage('Build') {
            steps {
                sh 'npm install' // Install dependencies
                sh 'npm run build' // Build the project
            }
        }

        stage('Compress Files') {
            steps {
                dir('Book-Store-MERN-Stack'){
                
                        sh 'tar -zcvf project.tar.gz --exclude=node_modules --exclude=src/index.js .'
                        }
        }
        }

        stage('Deploy to Elastic Beanstalk') {
            steps {
                script {
                    // Configure AWS credentials
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-cred']]) {
                        // Deploy to Elastic Beanstalk
                        step([$class: 'AWSEBDeploymentBuilder',
                            credentials: 'aws-cred',
                            region: 'us-east-1', // AWS region
                            applicationName: "${EB_APPLICATION_NAME}", // Elastic Beanstalk application name
                            environmentName: "${EB_ENVIRONMENT_NAME}", // Elastic Beanstalk environment name
                            fileName: 'project.tar.gz', // Path to your application's .zip file
                            bucketName: 'jenkins-upload001', // S3 bucket name
                            timeout: 30, // Timeout in minutes
                            ignoreHealthStatus: false // Set to true to ignore application health status during deployment
                        ])
                    }
                }
            }
        }
    }
}
