import {Request, Response} from 'express'
import Form from '@/models/Form'

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

            const form = new Form({
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

            res.status(201).json({form})
            

        } catch(e) {
            res.send(e)
        }
    }
}

export default FormController