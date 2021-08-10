import { Request, Response } from "express"
import Member from "@/models/Member"
import transporter from '@/plugins/nodemailer'
const memberController = {
  registerMember: async (req: Request, res: Response) => {
    const { firstName, lastName, email, contactNumber, businessName, reason, memberShipOption } = req.body
    try {
      const addMember = new Member({
        firstName,
        lastName,
        email,
        contactNumber,
        businessName,
        reason,
        memberShipOption
      })
      await addMember.save()
      const datas = {
        firstName: addMember.firstName,
        lastName: addMember.lastName,
        email: addMember.email,
        contactNumber: addMember.contactNumber,
        businessName: addMember.businessName,
        reason: addMember.reason,
        memberShipOption: addMember.memberShipOption
      }
      transporter.sendMail({
        from: 'KATALYST',
        to: 'ncomusibsim7@gmail.com',
        subject: `Member`,
        text: emailText(datas)
      })
      res.status(200).json({ addMember })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (datas: any) => `
Mastermin Group is currently FULL,
Details:
FirstName: ${datas.firstName},
Last Name: ${datas.lastName},
E-mail: ${datas.email},
ContactNumber: ${datas.contactNumber},
BusinessName: ${datas.businessName},
Reason to join KEC: ${datas.reason},
MemberShipOption: ${datas.memberShipOption}
`

export default memberController