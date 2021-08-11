import { Router } from 'express'
import eventAndGettingController from '../controller/eventAndGetting'
const router: Router = Router()

router.route('/get-event')
  .get(eventAndGettingController.getEvent)

router.route('/get-getting')
  .get(eventAndGettingController.getGettingAndKeep)

export default router