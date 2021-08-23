import { Request, Response } from 'express'
import InnerCircle from '@/models/InnerCircle'

const innerCercleController = {
  getInnerCercle: async (req: Request, res: Response) => {
    const { page, perPage, search }: any = req.query
    const newPage: any = parseInt(page)
    const newPerPage: any = parseInt(perPage)
    try {
      const addInnerCercle = await InnerCircle.find({
        $and: [
          search ? {
            $or: [
              { firstName: { $regex: search.toLowerCase(), $options: 'i' } },
              { businessName: { $regex: search, $options: 'i' } },
            ]
          } : {},
        ]
      })
        .skip((newPage * newPerPage) - newPerPage)
        .limit(newPerPage)
        .sort('-createdAt')
      const getInner = addInnerCercle.map((i: any) => {
        return {
          _id: i._id,
          fullName: i.firstName + ' ' + i.lastName,
          businessName: i.businessName,
          contact: i.contactNumber,
          website: i.website,
          turnover: i.turNover,
          noOfStaff: i.noOfStaff
        }
      })
      const counts = await InnerCircle.find({
        $and: [
          search ? {
            $or: [
              { firstName: { $regex: search.toLowerCase(), $options: 'i' } },
              { businessName: { $regex: search, $options: 'i' } },
            ]
          } : {},
        ]
      }).countDocuments()
      res.status(200).json({ getInner, totals: counts })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  updateInner: async (req: Request, res: Response) => {
    const {
      _id,
      firstName,
      lastName,
      email,
      contactNumber,
      businessName,
      website,
      turNover,
      noOfStaff,
      descriptions } = req.body
    try {
      const get_Update = await InnerCircle.findOneAndUpdate(_id, {
        $set: {
          firstName,
          lastName,
          email,
          contactNumber,
          businessName,
          website,
          turNover,
          noOfStaff,
          descriptions
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ get_Update })
    } catch (er) {
      throw new Error(er)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await InnerCircle.findByIdAndDelete(id)
      res.status(200).json('Delete succeed')
    } catch (e) {
      throw new Error(e)
    }
  },
  editInner: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await InnerCircle.findById(id)
      res.status(200).json({ getEdit })
    } catch (e) {
      throw new Error(e)
    }
  }

}



export default innerCercleController