import express, { Application } from 'express'
import * as http from 'http'
import indexRoute from '@src/routes/index.route'

export class SetupServer {
  private server?: http.Server

  constructor(private port = 3000, private app: Application = express()) {}

  public get App(): Application {
    return this.app
  }

  public async init(): Promise<void> {
    this.middlewares()
    this.controllers()
  }

  private middlewares(): void {
    this.app.use(express.json())
  }

  private controllers(): void {
    this.app.use('/', indexRoute)
  }

  public close(): void {
    if (this.server) {
      this.server.close()
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port)
    console.log('Server listen on port', this.port)
  }
}
