import { Request, Response } from 'express'
import Event from '@/models/Event'
import GettingAndKeep from '@/models/GettingAndKeep'
import moment from 'moment'
const eventAndGettingController = {

  getEvent: async (req: Request, res: Response) => {
    try {
      const getEvents = await Event.find().sort('-createdAt')
      const mapper = getEvents.map((i: any) => {
        return {
          _id: i._id,
          name: i.name,
          date: moment(i.date).locale('lo').format('YYYY-MM-DD'),
          bookTicketButton: i.bookTicketButton,
          details: i.details
        }
      })
      res.status(200).json({ mapper })
    } catch (e) {
      throw new Error(e)
    }
  },
  getGettingAndKeep: async (req: Request, res: Response) => {
    try {
      const getGettingAndKeep = await GettingAndKeep.find().sort('-createdAt')
      const mapper = getGettingAndKeep.map((i: any) => {
        return {
          _id: i._id,
          name: i.name,
          date: moment(i.date).locale('lo').format('YYYY-MM-DD'),
          bookTicketButtom: i.bookTicketButtom,
          details: i.details
        }
      })
      res.status(200).json({ mapper })
    } catch (e) {
      throw new Error(e)
    }
  },

}
export default eventAndGettingController