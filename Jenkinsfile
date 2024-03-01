pipeline {
    agent any
    
    tools{
        nodejs "nodejs"
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

        stage('Deploy to AWS') {
            steps {
                // Upload tarball to AWS Elastic Beanstalk
                withAWS(region: 'us-east-1', credentials: 'aws-cred') {
                    sh 'aws s3 cp project.tar.gz s3://jenkins-upload011/'
                    sh 'aws elasticbeanstalk create-application-version --application-name jenkins-mern --version-label 1.0.0 --source-bundle S3Bucket="jenkins-upload011",S3Key="project.tar.gz"'
                    sh 'aws elasticbeanstalk update-environment --application-name jenkins-mern --environment-name prod-environment --version-label 1.0.0'
                }
            }
        }
    }
}
