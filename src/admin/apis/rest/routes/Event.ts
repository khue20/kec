import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import eventController from '../controller/eventControler'
const router: Router = Router()

router.route('/add-event')
  .post(isAdmin, eventController.addEvent)

router.route('/get-event')
  .get(isAdmin, eventController.getEvent)

router.route('/update-event')
  .put(isAdmin, eventController.updateEvent)

router.route('/delete-event/:id')
  .delete(isAdmin, eventController.deleteEvent)
export default router
