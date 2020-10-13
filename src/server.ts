import express, { Application } from 'express'
import * as http from 'http'
import indexRoute from '@src/routes/index.route'
import * as database from './database'
import { MikroORM } from '@mikro-orm/core'
import logger from './logger'
import cors from 'cors'
import expressPino from 'express-pino-logger'

export class SetupServer {
  private server?: http.Server
  private orm?: MikroORM

  constructor(private port = 3000, private app: Application = express()) {}

  public get App(): Application {
    return this.app
  }

  public async init(): Promise<void> {
    this.middlewares()
    this.controllers()
    await this.database()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors({ origin: '*' }))
    this.app.use(expressPino({ logger: logger }))
  }

  private controllers(): void {
    this.app.use('/', indexRoute)
  }

  private async database(): Promise<void> {
    this.orm = await database.connect()
  }

  public closeServer(): void {
    if (this.server) {
      this.server.close()
    }
  }

  public async closeDatabase(): Promise<void> {
    if (this.orm) {
      await this.orm.close()
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port)
    logger.info('Server listen on port', this.port)
  }
}
