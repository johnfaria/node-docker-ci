import 'module-alias/register'
import express, { Application, Request, Response } from 'express'

const app: Application = express()

app.get('/', (_: Request, res: Response) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('Listen on 3000'); 
})
