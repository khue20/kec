"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const innerCircleSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    turNover: {
        type: String,
        required: true
    },
    noOfStaff: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        required: true
    }
}, { timestamps: true });
const InnerCircle = mongoose_1.model('InnerCircle', innerCircleSchema, 'InnerCircle');
exports.default = InnerCircle;
