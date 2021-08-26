import { Request, Response } from 'express'
import Package from '@/models/Package'
const packageController = {
  getPackage: async (req: Request, res: Response) => {
    try {
      const getPackage = await Package.find()
      res.status(200).json({ getPackage })
    } catch (e) {
      res.status(509).send(e)
    }
  }

}
export default packageController