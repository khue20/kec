import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import packageController from '../controller/PackageController'
const router: Router = Router()

router.route('/add-package')
  .post(isAdmin, packageController.addPackage)

router.route('/get-package')
  .get(isAdmin, packageController.getPackage)

router.route('/update-package')
  .put(isAdmin, packageController.updatePackage)

router.route('/delete-package/:id')
  .delete(isAdmin, packageController.deletePackage)

router.route('/edit-package/:id')
  .get(isAdmin, packageController.editPackage)

export default router
