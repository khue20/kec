import { Router, Request, Response } from 'express'
import businessMasteryController from '../controller/businessMasteryController'
const router: Router = Router()

router.route('/add-business')
  .post(businessMasteryController.addBusinessMastery)

export default router