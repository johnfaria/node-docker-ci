import { Request, Response } from 'express'

export function renderIndex(_: Request, res: Response): void {
  res.send('hello world')
}
