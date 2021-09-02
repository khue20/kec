"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    ticket: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number
    },
    qty: [{
            type: Number
        }]
}, { timestamps: true });
const Package = mongoose_1.model('Package', packageSchema, 'Package');
exports.default = Package;
