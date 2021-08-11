"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const formidable_1 = __importDefault(require("@/service/formidable"));
const router = express_1.Router();
router.route('/upload-image')
    .post(formidable_1.default);
exports.default = router;
