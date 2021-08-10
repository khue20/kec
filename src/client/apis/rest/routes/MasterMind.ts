import { Router, Request, Response } from 'express'
import masterMindController from '../controller/masterMindController'
const router: Router = Router()

router.route('/add-mastermind')
  .post(masterMindController.addMasterMind)

export default router