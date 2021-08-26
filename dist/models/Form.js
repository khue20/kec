"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
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
        // minlength: 8,
        // maxlength: 15,
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
            price: {
                type: Number
            },
            qty: {
                type: Number
            }
        }]
}, { timestamps: true });
const Form = mongoose_1.model('Form', formSchema, 'Form');
exports.default = Form;
