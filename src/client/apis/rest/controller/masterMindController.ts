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
      const addMasterMind: any = new Mastermind({
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
            subject: `Mastermind has new member registered`,
            text: emailText(detail)
          })
        })
        resolve('succeed')
      }, 1000))

      transporter.sendMail({
        from: 'KATALYST',
        to: addMasterMind.email,
        subject: `ສະບາຍດີທ່ານ, ${addMasterMind.firstName}  ${addMasterMind.lastName}`,
        text: `
ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມບັນຊີລໍຖ້າຂອງ Mastermind ນຳພວກເຮົາ. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້.
Thank you for your interest in joining us as waiting list on Mastermind. Once you have completed your information, our team will get in touch with you with more details.

ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
Katalyst Partners
        `
      })

      res.status(200).json({ addMasterMind })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (detail: any) => `
ລາຍລະອຽດຂໍ້ມູນສະມາຊິກຂອງ Mastermind:

ຊື່: ${detail.firstName},
ນາມສະກຸນ: ${detail.lastName},
ອິເມວ: ${detail.email},
ເບີໂທລະສັບ: ${detail.contactNumber},
ຊື່ຂອງທຸລະກິດ: ${detail.businessName},
ເວັບໄຊຣ: ${detail.website},
ລາຍຮັບລວມໃນຫນຶ່ງປີຜ່ານມາ: ${detail.reVenue}
`
// const emailText = (detail: any) => `
// New member details:

// First Name: ${detail.firstName},
// Last Name: ${detail.lastName},
// E-mail: ${detail.email},
// Contact Number: ${detail.contactNumber},
// Business Name: ${detail.businessName},
// Website: ${detail.website},
// ReVenue: ${detail.reVenue}
// `
export default masterMindController