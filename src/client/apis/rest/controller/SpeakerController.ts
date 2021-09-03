import { Request, Response } from 'express'
import Speaker from '@/models/Speaker'
const Path = process.env.SERVER_NAME || 'https://server.kec-lao.com/'
const speakerController = {

  getSpeaker: async (req: Request, res: Response) => {
    try {
      const getSpeaker = await Speaker.find()
      const mapSpeaker = getSpeaker.map((i: any) => {
        return {
          _id: i._id,
          profile: Path + i.profile,
          speakerName: i.speakerName,
          companyName: i.companyName
        }
      })
      res.status(200).json({ mapSpeaker })
    } catch (e) {
      res.status(500).send(e)
    }
  }

}
export default speakerController