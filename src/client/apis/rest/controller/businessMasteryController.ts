import { Request, Response } from 'express'
import BusinessMastery from '@/models/BusinessMastery'
import User from '@/models/User'
import transporter from '@/plugins/nodemailer'
const bannercontroller = {
  addBusinessMastery: async (req: Request, res: Response) => {
    const { firstName, lastName, gender, contactNumber, facebookName, email, businessName } = req.body
    try {
      const addBusiness: any = new BusinessMastery({
        firstName, lastName, gender, contactNumber, facebookName, email, businessName
      })
      await addBusiness.save()

      const isEmail = await User.find()
      await new Promise((resolve) => setTimeout(async () => {
        isEmail.map(async (email: any) => {
          transporter.sendMail({
            from: 'KATALYST',
            to: email.email,
            subject: `Katalyst Business Mastery `,
            text: emailText(addBusiness)
          })
        })
        resolve('succeed')
      }, 1000))
      //send to user
      transporter.sendMail({
        from: 'KATALYST',
        to: addBusiness.email,
        subject: `Katalyst Business Mastery`,
        text: `ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມງານ Business Mastery ຂອງພວກເຮົາ,
ພວກເຮົາໄດ້ຮັບການສະໝັກເຂົ້າມາ ຂອງທ່ານແລ້ວ
        `
      })

      res.status(200).json({ addBusiness })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (addBusiness: any) => `
Join the Katalyst Business Mastery,
Details:
First Name: ${addBusiness.firstName},
Last Name: ${addBusiness.lastName},
Gender,: ${addBusiness.gender},
E-mail:${addBusiness.email},
Contact Number: ${addBusiness.contactNumber},
Facebook Name: ${addBusiness.facebookName},
Business Name: ${addBusiness.businessName}
`
export default bannercontroller