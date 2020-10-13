import { Request, Response } from 'express'
import { DI } from '@src/database'
import { wrap } from '@mikro-orm/core'
import { User } from '@src/models/User'

export async function getUsers(_: Request, res: Response): Promise<void> {
  const response = await DI.userRepository.findAll()
  res.send(response)
}

export async function postUser(req: Request, res: Response): Promise<void> {
  const user = new User(req.body.name, req.body.email)
  wrap(user).assign(req.body)
  await DI.userRepository.persistAndFlush(user)
  res.send(user)
}

export const getUser = async (req: Request, res: Response): Promise<void>  => {
  const result = await DI.userRepository.findOne({ id: req.params.id })
  if (result) {
    result.name = 'JohnZao'
  }
  await DI.em.flush()
  res.send(result)
}
