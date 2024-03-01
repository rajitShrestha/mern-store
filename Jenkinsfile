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
                sh 'chmod -R 755 /var/lib/jenkins/workspace/mern01' // Adjust permissions recursively to 755
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
                withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'aws-cred'
                ]]) {
                    ebDeploy(
                        awsRegion: "${AWS_REGION}",
                        applicationName: "${EB_APPLICATION_NAME}",
                        environmentName: "${EB_ENVIRONMENT_NAME}",
                        versionLabel: "${VERSION_LABEL}",
                        sourceBundle: 'project.tar.gz'
                    )
                }
            }
        }
    }
}
