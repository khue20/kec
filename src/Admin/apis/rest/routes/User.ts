import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import userController from '../controller/userController'
import { adminSignIn } from '../../../../middlewares/auth'

const router: Router = Router()

router.route('/admin-login')
  .post(adminSignIn, userController.login)

router.route('/add-user')
  .post(userController.addUser)

router.route('/get-user')
  .get(userController.getUser)

router.route('/update-user')
  .put(userController.updateUser)

router.route('/bann-user/:id')
  .put(userController.isBan)

router.route('/delete-user/:id')
  .delete(userController.deleteUser)
export default router