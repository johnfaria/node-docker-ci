import { Router } from 'express'
const router = Router();

import { getUser, getUsers, postUser } from '@src/controllers/index.controller'

router.route('/')
    .get(getUsers);

router.route('/:id')
    .get(getUser);

router.route('/')
    .post(postUser);

export default router;