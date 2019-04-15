node {
  docker.image("mongo").withRun("--net mongonet") { c ->
    docker.image("mhart/alpine-node").inside("--net mongonet -e MONGO_URL='mongodb://${c.id}:27017'") {
      stage('Checkout') {
        checkout scm
      }
      stage('Initializiation') {
        steps {
          sh 'yarn'
          sh 'yarn run init'
          sh 'yarn add -g jest jest-cli'
        }
      }
      stage('Test') {
        steps {
        sh 'yarn test'
        }
      }
    }
  }
}