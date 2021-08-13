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
      const addInnerCercle: any = new InnerCircle({
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
      const details = {
        firstName: addInnerCercle.firstName,
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
            text: emailText(details)
          })
        })
        resolve('succeed')
      }, 1000))

      transporter.sendMail({
        from: 'KATALYST',
        to: addInnerCercle.email,
        subject: `ສະບາຍດີທ່ານ, ${addInnerCercle.firstName}  ${addInnerCercle.lastName}`,
        text: `
        ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມໃນ KEC ຂອງພວກເຮົາ. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້. 
        Thank you for your interest in joining us at KEC. Once you have completed your information, our team will get in touch with you with more details.        
        
        ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
        Katalyst Partners
        `
      })

      

      res.status(200).json({ addInnerCercle })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (details: any) => `
Join the Inner Cirlce Waiting List,
Details:
FirstName: ${details.firstName},
LastName: ${details.lastName},
E-mail:${details.email},
ContactNumber: ${details.contactNumber},
BusinessName: ${details.businessName},
Website: ${details.website},
TurNover: ${details.turNover},
No. of Staff: ${details.noOfStaff},
Descriptions: ${details.descriptions}
`
export default innerCercleController