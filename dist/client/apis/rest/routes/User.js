"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isUser = passport_1.authenticate('isUser', { session: false });
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../../../../middlewares/auth");
const router = express_1.Router();
router.route('/user-login')
    .post(auth_1.userSignIn, userController_1.default.login);
exports.default = router;
