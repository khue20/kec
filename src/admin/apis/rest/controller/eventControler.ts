import { Request, Response } from 'express'
import Event from '@/models/Event'
const eventController = {
  addEvent: async (req: Request, res: Response) => {
    const { name, date, bookTicketButton, details } = req.body
    try {
      const addEvents = new Event({
        name, date, bookTicketButton, details
      })
      await addEvents.save()
      res.status(200).json({ addEvents })
    } catch (er) {
      return res.status(509).json({ message: er })
    }
  },
  getEvent: async (req: Request, res: Response) => {
    try {
      const getEvents = await Event.find().sort('-createdAt')
      res.status(200).json({ getEvents })
    } catch (e) {
      throw new Error(e)
    }
  },
  updateEvent: async (req: Request, res: Response) => {
    const { _id, name, date, bookTicketButton, details } = req.body
    try {
      const Update = await Event.findByIdAndUpdate(_id, {
        $set: {
          name, date, bookTicketButton, details
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ Update })
    } catch (er) {
      throw new Error(er)
    }
  },
  deleteEvent: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await Event.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editEvent: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await Event.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      throw new Error(er)
    }
  }
}
export default eventController