import { Router, Request, Response } from 'express'
import FormController from '../controller/FormController'
const router: Router = Router()

router.route('/add-form')
  .post(FormController.addForm)

export default router