import User from '@/models/User'
import { Request, Response } from 'express'
import InnerCircle from '@/models/InnerCircle'
import transporter from '@/plugins/nodemailer'
const innerCercleController = {
  insertInnerCercle: async (req: Request, res: Response) => {
    const {
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
      const addInnerCercle = new InnerCircle({
        firstName,
        lastName,
        email,
        contactNumber,
        businessName,
        website,
        turNover,
        noOfStaff,
        descriptions
      })
      await addInnerCercle.save()
      const detail = {
        lastName: addInnerCercle.lastName,
        email: addInnerCercle.email,
        contactNumber: addInnerCercle.contactNumber,
        businessName: addInnerCercle.businessName,
        website: addInnerCercle.website,
        turNover: addInnerCercle.turNover,
        noOfStaff: addInnerCercle.noOfStaff,
        descriptions: addInnerCercle.descriptions
      }
      const mapUser = await User.find()
      await new Promise((resolve) => setTimeout(async () => {
        mapUser.map(async (email: any) => {
          transporter.sendMail({
            from: 'KATALYST',
            to: email.email,
            subject: `Inner Circle`,
            text: emailText(detail)
          })
        })
        resolve('succeed')
      }, 1000))

      res.status(200).json({ addInnerCercle })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (detail: any) => `
Join the Inner Cirlce Waiting List,
Details:
FirstName: ${detail.firstName},
LastName: ${detail.lastName},
E-mail:${detail.email},
ContactNumber: ${detail.contactNumber},
BusinessName: ${detail.businessName},
Website: ${detail.website},
TurNover: ${detail.turNover},
No. of Staff: ${detail.noOfStaff},
Descriptions: ${detail.descriptions}
`
export default innerCercleController