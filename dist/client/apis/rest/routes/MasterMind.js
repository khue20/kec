"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const masterMindController_1 = __importDefault(require("../controller/masterMindController"));
const router = express_1.Router();
router.route('/add-mastermind')
    .post(masterMindController_1.default.addMasterMind);
exports.default = router;
