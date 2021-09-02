import { Router } from 'express'
import packageController from '../controller/PackageController'
const router: Router = Router()

router.route('/get-package')
  .get(packageController.getPackage)

  
router.route('/get-special-price')
.get(packageController.getSpecialPrice)
export default router