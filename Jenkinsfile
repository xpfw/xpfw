pipeline {
  agent {
    docker {
      image 'mhart/alpine-node'
    }
  }
  stages {
    stage('Initializiation & Build') {
      steps {
        sh 'yarn'
        sh 'yarn run init'
      }
    }
    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}