import { Router } from "express"
import { authenticate } from 'passport'
const isAdmin = authenticate('isAdmin', { session: false })
import uploadImage from '@/service/formidable'
const router: Router = Router()

router.route('/upload-image')
  .post( uploadImage)
export default router