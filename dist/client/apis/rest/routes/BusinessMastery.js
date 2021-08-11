"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const businessMasteryController_1 = __importDefault(require("../controller/businessMasteryController"));
const router = express_1.Router();
router.route('/add-business')
    .post(businessMasteryController_1.default.addBusinessMastery);
exports.default = router;
