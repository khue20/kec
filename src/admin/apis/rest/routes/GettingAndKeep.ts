import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import gettingAndKeepController from '../controller/gettingController'
const router: Router = Router()

router.route('/add-getting')
  .post(isAdmin, gettingAndKeepController.addGettingAndKeep)

router.route('/get-getting')
  .get(isAdmin, gettingAndKeepController.getGettingAndKeep)

router.route('/update-getting')
  .put(isAdmin, gettingAndKeepController.updateGettingAndKeep)

router.route('/delete-getting/:id')
  .delete(isAdmin, gettingAndKeepController.deleteGetting)
export default router
