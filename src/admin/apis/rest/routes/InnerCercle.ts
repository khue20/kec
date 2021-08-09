import { Router, Request, Response } from 'express'
import innerCercleController from '../controller/innerCercleController'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
const router: Router = Router()

router.route('/get-innercercle')
  .get(isAdmin, innerCercleController.getInnerCercle)

router.route('/update-inner')
  .put(isAdmin, innerCercleController.updateInner)

router.route('/delete-inner/:id')
  .delete(isAdmin, innerCercleController.delete)

export default router