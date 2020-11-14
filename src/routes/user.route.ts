import { Router } from 'express'
const router = Router()

import { createUser, getUsers } from '@src/controllers/user.controller'
import { validateUser } from '@src/middleware/validation.middleware'

router.get('/users', getUsers)
router.post('/users', validateUser, createUser)

export default router
