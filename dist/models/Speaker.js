"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const speakerSchema = new mongoose_1.Schema({
    profile: {
        type: String,
        required: true
    },
    speakerName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Speaker = mongoose_1.model('Speaker', speakerSchema, 'Speaker');
exports.default = Speaker;
