import { Router, Request, Response } from 'express'
import speakerController from '../controller/SpeakerController'
const router: Router = Router()

router.route('/get-speaker')
  .get(speakerController.getSpeaker)
router.route('/sortorder')
  .put(speakerController.sortOrders)

export default router
