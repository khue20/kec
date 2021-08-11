import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import businessMasteryController from '../controller/businessMasteryController'
const router: Router = Router()

router.route('/update-business')
  .put(isAdmin, businessMasteryController.updateBusinessMastery)

router.route('/get-business')
  .get(isAdmin, businessMasteryController.getBusinessMastery)

router.route('/delete-business/:id')
  .delete(isAdmin, businessMasteryController.deleteBusinessMastery)

export default router