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
            subject: `Business Mastery has new member registered `,
            text: emailText(addBusiness)
          })
        })
        resolve('succeed')
      }, 1000))
      //send to user
      transporter.sendMail({
        from: 'KATALYST',
        to: addBusiness.email,
        subject: `ສະບາຍດີທ່ານ, ${addBusiness.firstName} ${addBusiness.lastName}`,
        text: `
ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມງານ Business Mastery ຂອງພວກເຮົາ ເຊິ່ງເປັນງານທໍາອິດທີ່ຈັດຂຶ້ນໃນ ສປປ ລາວ ແລະ ຈະຈັດຂຶ້ນຢູ່ທີ່ ນະຄອນຫຼວງວຽງຈັນ, ໂຮງແຮມ ຄຣາວ ພລາຊ່າ ວຽງຈັນ, ໃນວັນທີ 2 – 3 ຕຸລາ 2021. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້.
Thank you for your interest in joining us at Business Mastery in Vientiane on 2-3 October 2021 and being part of the first event of its kind in Lao PDR. Once you have completed your information, our team will get in touch with you with more details.
      
ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
Katalyst Partners

`
      })

      res.status(200).json({ addBusiness })
    } catch (er) {
      return res.status(409).json({ message: er })
    }
  }
}
const emailText = (addBusiness: any) => `
New member details:

First Name: ${addBusiness.firstName},
Last Name: ${addBusiness.lastName},
Gender: ${addBusiness.gender},
E-mail: ${addBusiness.email},
Contact Number: ${addBusiness.contactNumber},
Facebook Name: ${addBusiness.facebookName},
Business Name: ${addBusiness.businessName}
`
export default bannercontroller