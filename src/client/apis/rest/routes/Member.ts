import { Router } from 'express'
import memberController from '../controller/memberController'
const router: Router = Router()

router.route('/register-member')
  .post(memberController.registerMember)

export default router