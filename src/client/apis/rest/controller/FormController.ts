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
            email,
            // facebookName
            ownBusiness,
            packageChosen
        } = req.body
        try {
            const form: any = new Form({
                formCode,
                fullName,
                gender,
                mobile,
                // facebookName
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
ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມງານ ${form.formCode} ຂອງພວກເຮົາ ເຊິ່ງເປັນງານທໍາອິດທີ່ຈັດຂຶ້ນໃນ ສປປ ລາວ ແລະ ຈະຈັດຂຶ້ນຢູ່ທີ່ ນະຄອນຫຼວງວຽງຈັນ, ໂຮງແຮມ ຄຣາວ ພລາຊ່າ ວຽງຈັນ, ໃນວັນທີ 2 – 3 ຕຸລາ 2021. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້. 
Thank you for your interest in joining us at ${form.formCode} in Vientiane on 2-3 October 2021 and being part of the first event of its kind in Lao PDR. Once you have completed your information, our team will get in touch with you with more details.

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
ລາຍລະອຽດຂໍ້ມູນຂອງສະມາຊິກ:

ຊື່ ແລະ ນາມສະກຸນ: ${form.fullName},
ເພດ: ${form.gender},
ເບີໂທລະສັບ: ${form.mobile},
ອີເມວ: ${form.email},
ທ່ານມີທຸລະກິດແລ້ວບໍ?: ${form.ownBusiness},
ທາງເລືອກຈ່າຍຄ່າສະມາຊິກ: ${form.package.map((p: any) => `Ticket: ${p.ticket} - ${p.qty}`).join(', ')}
`
// const emailText = (form: any) => `
// New member details:

// Full Name: ${form.fullName},
// Gender: ${form.gender},
// Facebook Name: ${form.facebookName}
// Mobile Number: ${form.mobile},
// Email Adress: ${form.email},
// Own Business: ${form.ownBusiness},
// Package: ${form.package}
// `

export default FormController