"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FormController_1 = __importDefault(require("../controller/FormController"));
const router = express_1.Router();
router.route('/add-form')
    .post(FormController_1.default.addForm);
exports.default = router;
