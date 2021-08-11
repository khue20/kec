"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const businessMasterySchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    facebookName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    }
}, { timestamps: true });
const BusinessMastery = mongoose_1.model('BusinessMastery', businessMasterySchema, 'BusinessMastery');
exports.default = BusinessMastery;
