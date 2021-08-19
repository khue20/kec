import { model, Schema } from 'mongoose'

const formSchema = new Schema({
    formCode: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    // facebookName: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    ownBusiness: {
        type: String,
        required: true
    },
    package: [{
        _id: false,
        ticket: {
            type: String
        },
        qty: {
            type: Number
        }
    }]
}, { timestamps: true })

const Form = model('Form', formSchema, 'Form')

export default Form

