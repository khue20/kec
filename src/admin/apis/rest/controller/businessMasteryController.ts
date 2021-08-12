import { Request, Response } from 'express'
import BusinessMastery from '@/models/BusinessMastery'
const bannercontroller = {
  updateBusinessMastery: async (req: Request, res: Response) => {
    const { _id, firstName, lastName, gender, contactNumber, facebookName, email, businessName } = req.body
    try {
      const updateBusiness = await BusinessMastery.findByIdAndUpdate(_id, {
        $set: {
          firstName,
          lastName,
          gender,
          contactNumber,
          facebookName,
          email,
          businessName
        }
      }, { runValidators: true, new: true })

      res.status(200).json({ updateBusiness })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  getBusinessMastery: async (req: Request, res: Response) => {
    try {
      const getBusiness = await BusinessMastery.find().sort('-createdAt')
      res.status(200).json({ getBusiness })
    } catch (er) {
      throw new Error(er)
    }
  },
  deleteBusinessMastery: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await BusinessMastery.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editBusiness: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await BusinessMastery.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default bannercontroller