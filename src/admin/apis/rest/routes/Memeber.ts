import { Router } from "express"
import memberController from '../controller/memberController'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
const router: Router = Router()

router.route('/get-member')
  .get(isAdmin, memberController.getMember)

router.route('/update-member')
  .put(isAdmin, memberController.updateMember)

router.route('/delete-member/:id')
  .delete(isAdmin, memberController.deleteMember)

export default router