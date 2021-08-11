"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    bannerTypeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'BannerType'
    },
    onlineDate: {
        type: Date,
        required: true
    },
    closeDate: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
const Banner = mongoose_1.model('Banner', bannerSchema, 'Banner');
exports.default = Banner;
