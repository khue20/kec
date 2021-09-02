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
  },
  getSpecialPrice: async (req: Request, res: Response) => {
    try {
      const getPackage = await Package.find()
      const getSpecialPrice = getPackage.map((i: any) => {
        return {
          _id: i._id,
          ticket: i.ticket,
          price: i.price,
          originalPrice: i.originalPrice
        }
      })
      res.status(200).json({ getSpecialPrice })
    } catch (e) {
      res.status(509).send(e)
    }
  }

}
export default packageController