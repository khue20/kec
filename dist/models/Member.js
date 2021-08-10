"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
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
    reason: {
        type: String,
        required: true
    },
    memberShipOption: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Member = mongoose_1.model('Member', memberSchema, 'Member');
exports.default = Member;
