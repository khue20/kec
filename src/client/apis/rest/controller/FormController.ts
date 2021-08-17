import { Request, Response } from 'express'
import Form from '@/models/Form'
import User from '@/models/User'
import transporter from '@/plugins/nodemailer'
const FormController = {

    addForm: async (req: Request, res: Response) => {
        const {
            formCode,
            fullName,
            gender,
            mobile,
            facebookName,
            email,
            ownBusiness,
            packageChosen
        } = req.body
        try {

            const form: any = new Form({
                formCode,
                fullName,
                gender,
                mobile,
                facebookName,
                email,
                ownBusiness,
                package: packageChosen
            })

            await form.save()

            const mapUser = await User.find()
            await new Promise((resolve) => setTimeout(async () => {
                mapUser.map(async (email: any) => {
                    transporter.sendMail({
                        from: 'KATALYST',
                        to: email.email,
                        subject: `${form.formCode} has new member registered`,
                        text: emailText(form)
                    })
                })
                resolve('succeed')
            }, 1000))

            transporter.sendMail({
                from: 'KATALYST',
                to: form.email,
                subject: `ສະບາຍດີທ່ານ, ${form.fullName}`,
                text: `
 ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມໃນ KEC ຂອງພວກເຮົາ. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້. 
 Thank you for your interest in joining us at KEC. Once you have completed your information, our team will get in touch with you with more details.        
        
 ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
 Katalyst Partners
                `
            })

            res.status(201).json({ form })

        } catch (e) {
            res.send(e)
        }
    }
}
const emailText = (form: any) => `
New member's information:

Details: 
Full Name: ${form.fullName},
Gender: ${form.gender},
Mobile Number: ${form.mobile},
Facebook Name: ${form.facebookName},
Email Adress: ${form.email},
Own Business: ${form.ownBusiness},
Package: ${form.package}
`

export default FormController