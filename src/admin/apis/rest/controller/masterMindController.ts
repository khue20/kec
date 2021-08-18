import { Request, Response } from 'express'
import Mastermind from '@/models/Mastermind'
const masterMindController = {
  getMasterMind: async (req: Request, res: Response) => {
    const { page, perPage, search }: any = req.query
    const newPage: any = parseInt(page)
    const newPerPage: any = parseInt(perPage)
    try {
      const getMasterMind = await Mastermind.find({
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
      const getMaster = getMasterMind.map((i: any) => {
        return {
          _id: i._id,
          fullName: i.firstName + ' ' + i.lastName,
          businessName: i.businessName,
          contact: i.contactNumber,
          reVenue: i.reVenue,
          website: i.website
        }
      })
      res.status(200).json({ getMaster })
    } catch (er) {
      throw new Error(er)
    }
  },
  updateMastermind: async (req: Request, res: Response) => {
    const {
      _id,
      firstName,
      lastName,
      email,
      contactNumber,
      businessName,
      reVenue,
      website
    } = req.body
    try {
      const addMasterMind = await Mastermind.findByIdAndUpdate(_id, {
        $set: {
          firstName,
          lastName,
          email,
          contactNumber,
          businessName,
          reVenue,
          website
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ addMasterMind })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  deleteMaster: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      await Mastermind.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editMaster: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await Mastermind.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      throw new Error(er)
    }
  }
}

export default masterMindController