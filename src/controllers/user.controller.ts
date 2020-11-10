import { Request, Response } from 'express'

export async function getUsers(_: Request, res: Response): Promise<void> {
  res.json({ app: 'works' })
}
