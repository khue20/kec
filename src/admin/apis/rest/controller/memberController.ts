import { Request, Response } from 'express'
import Member from '@/models/Member'

const memberController = {
  getMember: async (req: Request, res: Response) => {
    const { page, perPage, search }: any = req.body
    const newPage: any = parseInt(page)
    const newPerPage: any = parseInt(perPage)
    try {
      const getMembers = await Member.find({
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
      const getMember = getMembers.map((i: any) => {
        return {
          _id: i._id,
          fullName: i.firstName + ' ' + i.lastName,
          businessName: i.businessName,
          contact: i.contactNumber,
          reason: i.reason,
          memberShipOption: i.memberShipOption
        }
      })
      res.status(200).json({ getMember })

    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  updateMember: async (req: Request, res: Response) => {
    const {
      _id,
      firstName,
      lastName,
      email,
      contactNumber,
      businessName,
      reason,
      memberShipOption } = req.body
    try {
      const updateMember = await Member.findByIdAndUpdate(_id, {
        $set: {
          firstName,
          lastName,
          email,
          contactNumber,
          businessName,
          reason,
          memberShipOption
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ updateMember })
    } catch (error) {
      return res.status(409).json({ message: error })
    }
  },
  deleteMember: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await Member.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editMember: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await Member.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default memberController