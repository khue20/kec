import { Router, Request, Response } from 'express'
import bannercontroller from '../controller/bannerController'
const router: Router = Router()

router.route('/get-banner/:bannertype')
  .get(bannercontroller.getBanner)

export default router