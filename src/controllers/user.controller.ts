import { ErrorHandler } from '@src/helpers/internal-error'
import { User } from '@src/models/user.model'
import { getAllUsersFromDatabase } from '@src/services/user.service'
import { Request, Response, RequestHandler, NextFunction } from 'express'
import { getRepository, QueryFailedError } from 'typeorm'

export const getUsers: RequestHandler = async (
  _: Request,
  res: Response
): Promise<void> => {
  const users = await getAllUsersFromDatabase()
  res.json(users)
}

export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = await getRepository(User).save(req.user)
    res.send(response)
  } catch (error) {
    if (error instanceof QueryFailedError) {
      next(new ErrorHandler(error.message, 422))
    } else {
      next(new ErrorHandler(error.message))
    }
  }
}

export const HelloWorldHandler = async (_req: Request, res: Response, _next: NextFunction) => {
  res.send("<h1>Hello World from Actions</h1>")
}
