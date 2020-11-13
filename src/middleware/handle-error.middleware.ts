import { ErrorHandler } from '@src/helpers/internal-error'
import { Request, Response, NextFunction } from 'express'

export const handleError = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  responseError(err, res)
  next()
}

const responseError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message, description } = err
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    description
  })
}
