import { Request, Response } from 'express'
import GettingAndKeep from '@/models/GettingAndKeep'

const gettingAndKeepController = {
  addGettingAndKeep: async (req: Request, res: Response) => {
    const { name, date, bookTicketButtom, details } = req.body
    try {
      const addGettingAndKeep = new GettingAndKeep({
        name, date, bookTicketButtom, details
      })
      await addGettingAndKeep.save()
      res.status(200).json({ addGettingAndKeep })
    } catch (er) {
      return res.status(509).json({ message: er })
    }
  },
  getGettingAndKeep: async (req: Request, res: Response) => {
    try {
      const getGettingAndKeep = await GettingAndKeep.find().sort('-createdAt')
      res.status(200).json({ getGettingAndKeep })
    } catch (e) {
      throw new Error(e)
    }
  },
  updateGettingAndKeep: async (req: Request, res: Response) => {
    const { _id, name, date, bookTicketButtom, details } = req.body
    try {
      const Update = await GettingAndKeep.findByIdAndUpdate(_id, {
        $set: {
          name, date, bookTicketButtom, details
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ Update })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  deleteGetting: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await GettingAndKeep.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default gettingAndKeepController