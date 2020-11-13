import express, { Application } from 'express'
import { Server } from 'http'
import userRoute from '@src/routes/user.route'
import logger from './logger'
import cors from 'cors'
import expressPino from 'express-pino-logger'
import { databaseConnect } from './database'
import { Connection } from 'typeorm'
import { handleError } from '@src/middleware/handle-error.middleware'

export class SetupServer {
  private server?: Server
  private database?: Connection

  constructor(private port = 3000, private app: Application = express()) {}

  public get App(): Application {
    return this.app
  }

  public async init(): Promise<void> {
    this.middlewares()
    this.controllers()
    await this.initDatabase()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
    this.app.use(expressPino({ logger: logger }))
  }

  private controllers(): void {
    this.app.use('/', userRoute)
    this.app.use(handleError)
  }

  public closeServer(): void {
    if (this.server) {
      this.server.close()
    }
  }

  public start(): void {
    if (this.database?.isConnected) {
      this.server = this.app.listen(this.port)
      logger.info(`Server listen on port ${this.port.toString()}`)
    }
  }

  private async initDatabase(): Promise<void> {
    this.database = await databaseConnect()
  }

  public async closeDatabase(): Promise<void> {
    await this.database?.close()
  }
}
