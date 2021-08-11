"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bannerController_1 = __importDefault(require("../controller/bannerController"));
const router = express_1.Router();
router.route('/get-banner/:bannertype')
    .get(bannerController_1.default.getBanner);
exports.default = router;
