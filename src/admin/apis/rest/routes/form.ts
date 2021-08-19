import { Router, Request, Response } from 'express'
import FormController from '../controller/FormController'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
const router: Router = Router()

router.route('/get-forms')
  .get(isAdmin, FormController.getForms)

router.route('/get-form/:formId')
  .get(isAdmin, FormController.getForm)

router.route('/update-form')
  .put(isAdmin, FormController.updateForm)

router.route('/delete-form/:formId')
.delete(isAdmin, FormController.deleteForm)
export default router