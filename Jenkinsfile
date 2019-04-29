node {
  docker.image("mongo").withRun("") { c ->
    docker.image("mhart/alpine-node").inside("--network=container:${c.id}") {
      checkout scm
      sh 'yarn'
      sh 'yarn run init'
      sh 'yarn run build'
      sh 'yarn add -g jest jest-cli'
      sh 'yarn test'
    }
  }
}