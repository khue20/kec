import { Request, Response } from 'express'
import Speaker from '@/models/Speaker'

const speakerController = {

  addSpeaker: async (req: Request, res: Response) => {
    const { profile, speakerName, companyName } = req.body
    try {
      const addSpeaker = new Speaker({
        profile, speakerName, companyName
      })
      await addSpeaker.save()
      res.status(200).json({ addSpeaker })
    } catch (er) {
      return res.status(509).json({ message: er })
    }
  },

  getSpeaker: async (req: Request, res: Response) => {
    try {
      const getSpeaker = await Speaker.find()
      res.status(200).json({ getSpeaker })
    } catch (e) {
      res.status(500).send(e)
    }
  },
  updateSpeaker: async (req: Request, res: Response) => {
    const { _id, profile, speakerName, companyName } = req.body
    try {
      const updateSpeaker = await Speaker.findByIdAndUpdate(_id, {
        $set: {
          profile, speakerName, companyName
        }
      }, { runValidators: true, new: true })
      res.status(200).json({ updateSpeaker })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  },
  deleteSpeaker: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await Speaker.findByIdAndDelete(id)
      res.status(200).json('Deleted succeed')
    } catch (er) {
      throw new Error(er)
    }
  },
  editSpeaker: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const getEdit = await Speaker.findById(id)
      res.status(200).json({ getEdit })
    } catch (er) {
      res.status(500).send(er)
    }
  }
}
export default speakerController