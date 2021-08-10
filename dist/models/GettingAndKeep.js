"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gettingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    bookTicketButtom: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Getting = mongoose_1.model('Getting', gettingSchema, 'Getting');
exports.default = Getting;
