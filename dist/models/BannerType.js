"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bannerTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });
const BannerType = mongoose_1.model('BannerType', bannerTypeSchema, 'BannerType');
exports.default = BannerType;
