import * as http from 'http'
import { User } from './models/user.model';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    user: User
  }
}
