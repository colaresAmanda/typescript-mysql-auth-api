import {Router} from 'express'

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'

import authMiddleware from './app/middlewares/authMiddleware'
const router = Router()

router.post('/users', UserController.store)
router.post('/auth', AuthController.authenticate)
router.get('/users', UserController.getAll)

export default router