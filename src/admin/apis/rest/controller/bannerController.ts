import { Request, Response } from 'express'
import Banner from '@/models/Banner'
const bannercontroller = {
  addBanner: async (req: Request, res: Response) => {
    const { image, url, bannerTypeId, onlineDate, closeDate } = req.body
    try {
      const addBanners = new Banner({
        image, url, bannerTypeId, onlineDate, closeDate
      })
      await addBanners.save()
      res.status(200).json({ addBanners })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  updateBanner: async (req: Request, res: Response) => {
    const { _id, image, url, bannerTypeId, onlineDate, closeDate } = req.body
    try {
      const updateBanner = await Banner.findByIdAndUpdate(_id, {
        $set: {
          image, url, bannerTypeId, onlineDate, closeDate
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ updateBanner })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  getBanner: async (req: Request, res: Response) => {
    try {
      const getBanner = await Banner.find().sort('-createdAt')
      res.status(200).json({ getBanner })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  deleteBanner: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await Banner.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  editBanner: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await Banner.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
}
export default bannercontroller