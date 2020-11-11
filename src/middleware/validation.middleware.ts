import { User } from '@src/models/user.model'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validate, ValidationError } from 'class-validator'

export const validateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = new User()
  Object.assign(user, req.body)
  const errors: ValidationError[] = await validate(user)
  if (errors.length > 0) {
    res.status(422).send({status: 422, message: errors.map(el => el.constraints)})
  } else {
    req.user = user
    next()
  }
}
