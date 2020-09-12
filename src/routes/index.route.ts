import { Router } from 'express'
const router = Router();

import { renderIndex } from '@src/controllers/index.controller'

router.route('/')
    .get(renderIndex);

export default router;