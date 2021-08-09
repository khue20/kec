import { Router, Request, Response } from 'express'
import innerCercleController from '../controller/innerCercleController'
const router: Router = Router()

router.route('/add-innercercle')
  .post(innerCercleController.insertInnerCercle)

export default router