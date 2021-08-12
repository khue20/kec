import { Router, Request, Response } from 'express'
import masterMindController from '../controller/masterMindController'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
const router: Router = Router()

router.route('/get-mastermind')
  .get(isAdmin, masterMindController.getMasterMind)

router.route('/update-mastermind')
  .put(isAdmin, masterMindController.updateMastermind)

router.route('/delete-mastermind/:id')
  .delete(isAdmin, masterMindController.deleteMaster)

  router.route('/edit-mastermind/:id')
  .get(isAdmin, masterMindController.editMaster)

export default router