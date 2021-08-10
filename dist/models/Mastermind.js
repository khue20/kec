"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mastermindSchema = new mongoose_1.Schema({
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
    reVenue: {
        type: String,
        required: true
    },
    website: {
        type: String
    }
}, { timestamps: true });
const Mastermind = mongoose_1.model('Mastermind', mastermindSchema, 'Mastermind');
exports.default = Mastermind;
