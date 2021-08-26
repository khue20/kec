import { Request, Response } from 'express'
import Form from '@/models/Form'

const FormController = {

    getForms: async (req: Request, res: Response) => {
        const { page, perPage, search, formCode }: any = req.query
        const newPage: any = parseInt(page)
        const newPerPage: any = parseInt(perPage)
        try {
            const form = await Form.find({
                $and: [
                    search ? {
                        $or: [
                            { fullName: { $regex: search.toLowerCase(), $options: 'i' } },
                        ]
                    } : {},
                    {
                        formCode: formCode
                    }
                ]
            }).skip((newPage * newPerPage) - newPerPage)
                .limit(newPerPage)
                .sort('-createdAt')
            const forms = form.map((i: any) => {
                return {
                    _id: i._id,
                    formCode: i.formCode,
                    fullName: i.fullName,
                    gender: i.gender,
                    mobile: i.mobile,
                    email: i.email,
                    ownBusiness: i.ownBusiness,
                    package: i.package.map((p: any) => `${p.ticket} - ${p.price} ກີບ: ${p.qty}`).join(', ')
                }
            })
            const counts = await Form.find({
                $and: [
                    search ? {
                        $or: [
                            { fullName: { $regex: search.toLowerCase(), $options: 'i' } },
                        ]
                    } : {},
                    {
                        formCode: formCode
                    }
                ]
            }).countDocuments()
            res.status(201).json({ forms, totals: counts })
        } catch (e) {
            res.status(500).send(e)
        }
    },
    getForm: async (req: Request, res: Response) => {
        const { formId } = req.params
        try {
            const form = await Form.findById({ _id: formId })

            res.status(200).json({ form })

        } catch (e) {
            res.status(500).send(e)
        }
    },

    updateForm: async (req: Request, res: Response) => {
        const {
            formId,
            formCode,
            fullName,
            gender,
            mobile,
            // facebookName,
            email,
            ownBusiness
        } = req.body
        try {

            const form = await Form.findByIdAndUpdate(formId, {
                formCode,
                fullName,
                gender,
                mobile,
                // facebookName,
                email,
                ownBusiness
            }, { runValidators: true, new: true })

            res.status(200).json({ form })

        } catch (e) {
            res.send(e)
        }
    },
    deleteForm: async (req: Request, res: Response) => {
        try {
            const { formId }: any = req.params
            await Form.findByIdAndDelete({ _id: formId })
            res.status(200).json('Deleted succeed')
        } catch (er) {
            res.status(500).send(er)
        }
    }
}

export default FormController