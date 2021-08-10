"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberController_1 = __importDefault(require("../controller/memberController"));
const router = express_1.Router();
router.route('/register-member')
    .post(memberController_1.default.registerMember);
exports.default = router;
