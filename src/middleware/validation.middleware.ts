import { User } from '@src/models/user.model'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validate, ValidationError } from 'class-validator'
import { ErrorHandler } from '@src/helpers/internal-error'

export const validateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = new User()
    Object.assign(user, req.body)
    const errors = await validate(user)
    if (errors.length > 0) {
      // res.status(422).send({status: 422, message: errors.map(el => el.constraints)})
      throw new ErrorHandler('Validation Error', 422, "Formatos de entrada incorretos")
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    next(error)
  }
}
