import * as http from "http"

const emptyPort: () => Promise<number> = () => {
  return new Promise((resolve, reject) => {
    const server = http.createServer()
      .listen(0, () => {
        let a: any = server.address()
        const port = a.port
        server.close(() => {
          resolve(port)
        })
      })
      .on(`error`, reject)
  })
}

export default emptyPort
