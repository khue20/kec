import { Request, Response } from 'express'
import BannerType from '@/models/BannerType'

const bannerTypecontroller = {
  addBannertype: async (req: Request, res: Response) => {
    const { name } = req.params
    try {
      const isCheck = await BannerType.findOne({ name })
      if (isCheck) return res.status(409).json({ message: 'This banner type already added' })
      const addBannertypes = new BannerType({
        name
      })
      await addBannertypes.save()
      res.status(200).json({ addBannertypes })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  getBannerType: async (req: Request, res: Response) => {
    try {
      const getBannerType = await BannerType.find()
      res.status(200).json({ getBannerType })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  updateBannerType: async (req: Request, res: Response) => {
    try {
      const { _id, name } = req.body
      const isCheck = await BannerType.findOne({ name })
      if (isCheck) return res.status(409).json({ message: 'This banner type already added' })
      await BannerType.findByIdAndUpdate(_id, {
        $set: {
          name
        }
      }, { runValidators: true, new: true })
      res.status(200).json('Update succeed')
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  deleteBannerType: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await BannerType.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editBannerType: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await BannerType.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default bannerTypecontroller