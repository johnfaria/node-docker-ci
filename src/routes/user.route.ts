import { Router } from 'express'
const router = Router()

import { getUsers } from '@src/controllers/user.controller'

router.get('/', getUsers)

export default router
