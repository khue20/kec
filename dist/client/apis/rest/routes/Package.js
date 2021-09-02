"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PackageController_1 = __importDefault(require("../controller/PackageController"));
const router = express_1.Router();
router.route('/get-package')
    .get(PackageController_1.default.getPackage);
router.route('/get-special-price')
    .get(PackageController_1.default.getSpecialPrice);
exports.default = router;
