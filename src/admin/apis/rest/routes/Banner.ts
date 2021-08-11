import { Router, Request, Response } from 'express'
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import bannercontroller from '../controller/bannerController'
const router: Router = Router()

router.route('/add-banner')
  .post(isAdmin, bannercontroller.addBanner)

router.route('/update-banner')
  .put(isAdmin, bannercontroller.updateBanner)

router.route('/get-banner')
  .get(isAdmin, bannercontroller.getBanner)

router.route('/delete-banner/:id')
  .delete(isAdmin, bannercontroller.deleteBanner)

export default router