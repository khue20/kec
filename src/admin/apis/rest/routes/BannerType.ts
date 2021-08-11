import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import bannerTypecontroller from '../controller/bannerTypeController'
const router: Router = Router()

router.route('/add-bannertype/:name')
  .post(isAdmin, bannerTypecontroller.addBannertype)

router.route('/update-bannertype')
  .put(isAdmin, bannerTypecontroller.updateBannerType)

router.route('/get-bannertype')
  .get(isAdmin, bannerTypecontroller.getBannerType)

router.route('/delete-bannertype/:id')
.delete(isAdmin, bannerTypecontroller.deleteBannerType)
export default router