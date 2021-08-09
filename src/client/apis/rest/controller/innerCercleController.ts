import { Request, Response } from 'express'
import InnerCircle from '../../../../models/InnerCircle'
import transporter from '../../../../plugins/nodemailer'
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
      transporter.sendMail({
        from: 'KATALYST',
        to: 'ncomusibsim7@gmail.com',
        subject: `Inner Circle`,
        text: emailText(detail)
      })
      res.status(200).json({ addInnerCercle })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (detail: any) => `
Join the Inner Cirlce Waiting List,
Details:
firstName: ${detail.firstName},
lastName: ${detail.lastName},
email:${detail.email},
contactNumber: ${detail.contactNumber},
businessName: ${detail.businessName},
website: ${detail.website},
turNover: ${detail.turNover},
No. of Staff: ${detail.noOfStaff},
descriptions: ${detail.descriptions}
`


export default innerCercleController