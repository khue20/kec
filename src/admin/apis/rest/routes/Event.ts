import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import eventController from '../controller/eventControler'
import { eventValidation } from '@/admin/Validator/eventValidator'
const router: Router = Router()

router.route('/add-event')
  .post(isAdmin, eventValidation, eventController.addEvent)

router.route('/get-event')
  .get(isAdmin, eventController.getEvent)

router.route('/update-event')
  .put(isAdmin, eventController.updateEvent)

router.route('/delete-event/:id')
  .delete(isAdmin, eventController.deleteEvent)
router.route('/edit-event/:id')
  .get(isAdmin, eventController.editEvent)

export default router
