import { User } from '@src/models/user.model'
import { getAllUsersFromDatabase } from '@src/services/user.service'
import { Request, Response, RequestHandler } from 'express'
import { getRepository } from 'typeorm'

export const getUsers: RequestHandler = async (
  _: Request,
  res: Response
): Promise<void> => {
  const users = await getAllUsersFromDatabase()
  res.json({ users: users })
}

export const createUser: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...response } = await getRepository(User).save(req.user)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}
