"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../../../../middlewares/auth");
const router = express_1.Router();
router.route('/admin-login')
    .post(auth_1.adminSignIn, userController_1.default.login);
router.route('/add-user')
    .post(userController_1.default.addUser);
router.route('/get-user')
    .get(userController_1.default.getUser);
router.route('/update-user')
    .put(userController_1.default.updateUser);
router.route('/bann-user/:id')
    .put(userController_1.default.isBan);
router.route('/delete-user/:id')
    .delete(userController_1.default.deleteUser);
exports.default = router;
