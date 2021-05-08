import { Router } from 'express'
const router = Router()

import { createUser, getUsers, HelloWorldHandler } from '@src/controllers/user.controller'
import { validateUser } from '@src/middleware/validation.middleware'

router.get('/users', getUsers)
router.post('/users', validateUser, createUser)
router.get('/hello', HelloWorldHandler)

export default router
