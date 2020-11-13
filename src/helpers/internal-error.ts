export class ErrorHandler extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public description?: string 
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
