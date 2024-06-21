pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig-credentials-id')
        IMAGE_TAG = "latest"
        NAMESPACE = "microservices"
    }

    stages {
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images locally
                    docker.build("your-frontend-image:${IMAGE_TAG}", "./src/frontend/react")
                    docker.build("your-backend-image:${IMAGE_TAG}", "./src/backend/spring")
                    docker.build("your-scrappers-image:${IMAGE_TAG}", "./src/backend/scrappers")
                    docker.build("your-nginx-image:${IMAGE_TAG}", "./src/deployment/nginx")
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    def yamlDir = './src/deployment/kubernetes'

                    def yamlFiles = sh(script: "find ${yamlDir} -type f -name '*.yaml'", returnStdout: true).trim().split("\n")

                    yamlFiles.each { yamlFile ->
                        sh "kubectl apply -f ${yamlFile}"
                    }

                    // Perform rolling updates for deployments
                    sh "kubectl rollout restart deployment/backend -n ${NAMESPACE}"
                    sh "kubectl rollout restart deployment/frontend -n ${NAMESPACE}"
                    sh "kubectl rollout restart deployment/scrappers -n ${NAMESPACE}"
                    sh "kubectl rollout restart deployment/nginx -n ${NAMESPACE}"

                    // Wait for deployments to stabilize
                    sh "kubectl rollout status deployment/backend -n ${NAMESPACE}"
                    sh "kubectl rollout status deployment/frontend -n ${NAMESPACE}"
                    sh "kubectl rollout status deployment/scrappers -n ${NAMESPACE}"
                    sh "kubectl rollout status deployment/nginx -n ${NAMESPACE}"
                }
            }
        }
    }
}
