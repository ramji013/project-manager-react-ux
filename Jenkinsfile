pipeline {
    agent any

    tools {
           maven 'maven_home'
    }

    stages{
        stage('Compile'){
            steps{
                  bat 'mvn clean compile'
            }
        }
        stage('Unit Testing'){
            steps{
                  bat 'mvn test'
            }
        }
        stage('Deploy App'){
            steps{
                  bat 'mvn deploy'
           }
        }
    }

}