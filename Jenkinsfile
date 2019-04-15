node {
  docker.image("mongo").withRun("--net mongonet") { c ->
    docker.image("mhart/alpine-node").inside("--net mongonet -e MONGO_URL='mongodb://${c.id}:27017'") {
      checkout scm
      sh 'yarn'
      sh 'yarn run init'
      sh 'yarn add -g jest jest-cli'
      sh 'yarn test'
    }
  }
}