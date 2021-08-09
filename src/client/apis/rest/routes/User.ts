import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isUser = authenticate('isUser', { session: false })
import userController from '../controller/userController'
import { userSignIn } from '../../../../middlewares/auth'
const router: Router = Router()

router.route('/user-login')
  .post(userSignIn, userController.login)

export default router