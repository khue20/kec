import { Request, Response } from 'express'
import Mastermind from '@/models/Mastermind'
import transporter from '../../../../plugins/nodemailer'
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
      await addMasterMind.save()
      const detail = {
        firstName: addMasterMind.firstName,
        lastName: addMasterMind.lastName,
        email: addMasterMind.email,
        contactNumber: addMasterMind.contactNumber,
        businessName: addMasterMind.businessName,
        reVenue: addMasterMind.reVenue,
        website: addMasterMind.website
      }
      transporter.sendMail({
        from: 'KATALYST',
        to: 'ncomusibsim7@gmail.com',
        subject: `Mastermind`,
        text: emailText(detail)
      })
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