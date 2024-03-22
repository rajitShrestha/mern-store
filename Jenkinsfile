pipeline {
    agent any
    environment {
        registryCredential = 'ecr:us-east-1:aws-cred'
        appRegistry = "927100586272.dkr.ecr.us-east-1.amazonaws.com/book-store"
        projectRegistry = "https://927100586272.dkr.ecr.us-east-1.amazonaws.com"
        cluster = "Book-store"
        service = "bookstore-frontend-svc"
    }
  stages {
    stage('Fetch code'){
      steps {
        git branch: 'docker-container', url: 'https://github.com/rajitShrestha/Book-Store-MERN-Stack.git'
      }
    }


    stage('Build App Image') {
       steps {
       
         script {

                dir('frontend') {

                  dockerImage = docker.build( appRegistry + ":$BUILD_NUMBER")

                }
             }

     }
    
    }

    stage('Upload App Image') {
          steps{
            script {
              docker.withRegistry( projectRegistry, registryCredential ) {
                dockerImage.push("$BUILD_NUMBER")
                dockerImage.push('latest')
              }
            }
          }
     }
     
     stage('Deploy to ecs') {
          steps {
        withAWS(credentials: 'aws-cred', region: 'us-east-1') {
          sh 'aws ecs update-service --cluster ${cluster} --service ${service} --force-new-deployment'
        }
      }
     }

  }
}
