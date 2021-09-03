import { Router, Request, Response } from 'express'
import speakerController from '../controller/SpeakerController'
const router: Router = Router()

router.route('/get-speaker')
  .get(speakerController.getSpeaker)


export default router
