import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import userController from '../controller/userController'
import { adminSignIn } from '../../../../middlewares/auth'
import { userValidator, logins } from '@/admin/Validator/UserValidator'
const router: Router = Router()

router.route('/admin-login')
  .post(logins, adminSignIn, userController.login)

router.route('/add-user')
  .post(isAdmin, userValidator, userController.addUser)

router.route('/get-user')
  .get(isAdmin, userController.getUser)

router.route('/update-user')
  .put(isAdmin, userController.updateUser)

router.route('/bann-user/:id')
  .put(isAdmin, userController.isBan)

router.route('/delete-user/:id')
  .delete(isAdmin, userController.deleteUser)
router.route('/get-edit/:id')
  .get(isAdmin, userController.editUser)
export default router