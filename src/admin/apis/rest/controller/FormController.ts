import {Request, Response} from 'express'
import Form from '@/models/Form'

const FormController = {

    getForms: async (req: Request, res: Response) => {
        const {formCode} = req.params
        try {
            const forms = await Form.find({ formCode })
            res.status(201).json({forms})
        } catch(e) {
            res.status(500).send(e)
        }
    },
    getForm: async (req: Request, res: Response) => {
        const { formId } = req.params
        try {
            const form = await Form.findById({ _id: formId })

            res.status(200).json({form})
    
        } catch(e) {
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
            facebookName,
            email,
            ownBusiness
        } = req.body
        try {

            const form = await Form.findByIdAndUpdate(formId, {
                formCode,
                fullName,
                gender,
                mobile,
                facebookName,
                email,
                ownBusiness
            }, {runValidators: true, new: true})

            res.status(200).json({form})
            
        } catch(e) {
            res.send(e)
        }
    }
}

export default FormController