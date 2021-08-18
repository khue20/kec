import { Request, Response } from "express"
import Member from "@/models/Member"
import transporter from '@/plugins/nodemailer'
import User from "@/models/User"
const memberController = {
  registerMember: async (req: Request, res: Response) => {
    const { firstName, lastName, email, contactNumber, businessName, reason, memberShipOption } = req.body
    try {
      const addMember: any = new Member({
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
      const mapUser = await User.find()
      await new Promise((resolve) => setTimeout(async () => {
        mapUser.map(async (email: any) => {
          transporter.sendMail({
            from: 'KATALYST',
            to: email.email,
            subject: `New member registered`,
            text: emailText(datas)
          })
        })
        resolve('succeed')
      }, 1000))

      transporter.sendMail({
        from: 'KATALYST',
        to: addMember.email,
        subject: `ສະບາຍດີທ່ານ, ${addMember.firstName}  ${addMember.lastName}`,

        text: `
ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມໃນ KEC ຂອງພວກເຮົາ. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້. 
Thank you for your interest in joining us at KEC. Once you have completed your information, our team will get in touch with you with more details.        

ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
Katalyst Partners
        `
      })
      res.status(200).json({ addMember })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (datas: any) => `
New member details:

First Name: ${datas.firstName},
Last Name: ${datas.lastName},
E-mail: ${datas.email},
Contact Number: ${datas.contactNumber},
BusinessName: ${datas.businessName},
Reason to join KEC: ${datas.reason},
MemberShip Option: ${datas.memberShipOption}
`

export default memberController