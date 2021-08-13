import { Router, Request, Response } from 'express'
import FormController from '../controller/FormController'
const router: Router = Router()

router.route('/get-forms/:formCode')
  .get(FormController.getForms)

router.route('/get-form/:formId')
  .get(FormController.getForm)

router.route('/update-form')
  .put(FormController.updateForm)

export default router