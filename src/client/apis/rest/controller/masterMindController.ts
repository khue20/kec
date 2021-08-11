import { Request, Response } from 'express'
import Mastermind from '@/models/Mastermind'
import transporter from '@/plugins/nodemailer'
import User from '@/models/User'
const masterMindController = {
  addMasterMind: async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      businessName,
      reVenue,
      website
    } = req.body
    try {
      const addMasterMind = new Mastermind({
        firstName,
        lastName,
        email,
        contactNumber,
        businessName,
        reVenue,
        website
      })
      const i: any = await addMasterMind.save()
      const detail = {
        firstName: i.firstName,
        lastName: i.lastName,
        email: i.email,
        contactNumber: i.contactNumber,
        businessName: i.businessName,
        reVenue: i.reVenue,
        website: i.website
      }
      const mapUser = await User.find()
      await new Promise((resolve) => setTimeout(async () => {
        mapUser.map(async (email: any) => {
          transporter.sendMail({
            from: 'KATALYST',
            to: email.email,
            subject: `Mastermind`,
            text: emailText(detail)
          })
        })
        resolve('succeed')
      }, 1000))

      res.status(200).json({ addMasterMind })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (detail: any) => `
Mastermin Group is currently FULL,
Details:
FirstName: ${detail.firstName},
Last Name: ${detail.lastName},
E-mail: ${detail.email},
ContactNumber: ${detail.contactNumber},
BusinessName: ${detail.businessName},
Website: ${detail.website},
ReVenue: ${detail.reVenue}
`
export default masterMindController