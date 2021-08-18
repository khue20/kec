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
        type: Boolean,
        required: true
    },
    package: [{
        type: String
    }]
}, { timestamps: true })

const Form = model('Form', formSchema, 'Form')

export default Form

