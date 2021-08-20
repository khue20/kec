import { Request, Response } from 'express'
import Banner from '@/models/Banner'
import BannerType from '@/models/BannerType'
import moment from 'moment'
const bannercontroller = {
  getBanner: async (req: Request, res: Response) => {
    const { bannertype } = req.params
    try {
      const now = moment(new Date()).locale('lo')
      const type = 'online'
      const types: any = {
        online: [
          {
            onlineDate: { $lte: now }
          },
          {
            closeDate: { $gte: now }
          },
          { status: true }
        ]
      }
      const getId: any = await BannerType.findOne({ name: bannertype })
      if (!getId) return res.status(409).json('This banner type does not exist!')
      const getBanner = await Banner.find({
        $and: types[type],
        bannerTypeId: getId._id
      })
      res.status(200).json({ getBanner })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
export default bannercontroller