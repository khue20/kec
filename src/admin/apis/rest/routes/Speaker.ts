import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import speakerController from '../controller/SpeakerController'
const router: Router = Router()

router.route('/add-speaker')
  .post(isAdmin, speakerController.addSpeaker)

router.route('/get-speaker')
  .get(isAdmin, speakerController.getSpeaker)

router.route('/update-speaker')
  .put(isAdmin, speakerController.updateSpeaker)

router.route('/delete-speaker/:id')
  .delete(isAdmin, speakerController.deleteSpeaker)

router.route('/edit-speaker/:id')
  .get(isAdmin, speakerController.editSpeaker)

export default router
