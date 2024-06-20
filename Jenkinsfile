pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t your-frontend-image ./src/frontend/react'
                sh 'docker build -t your-backend-image ./src/backend/spring'
                sh 'docker build -t your-scrappers-image ./src/backend/scrappers'
            }
        }
        stage('Push') {
            steps {
                withCredentials([string(credentialsId: 'docker-registry-credentials', variable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u your-docker-username --password-stdin'
                    sh 'docker push your-frontend-image'
                    sh 'docker push your-backend-image'
                    sh 'docker push your-scrappers-image'
                }
            }
        }
        stage('Deploy') {
            steps {
                kubernetesDeploy(
                    configs: 'k8s/*.yaml',
                    kubeconfigId: 'kubeconfig-credentials-id'
                )
            }
        }
    }
}
