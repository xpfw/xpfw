node {
  docker.image("mongo").withRun("") { c ->
    docker.image("mhart/alpine-node").inside("--network=container:${c.id}") {
      // ensure same time zone as developer host so snapshots don't differ
      sh "apk add tzdata"
      sh "cp /usr/share/zoneinfo/Europe/Amsterdam /etc/localtime"
      sh 'echo "Europe/Amsterdam" > /etc/timezone'

      checkout scm

      sh 'yarn'
      sh 'yarn run init'
      sh 'yarn run build'
      sh 'yarn add -g jest jest-cli'
      sh 'yarn test'
    }
  }
}