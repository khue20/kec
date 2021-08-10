"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberController_1 = __importDefault(require("../controller/memberController"));
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const router = express_1.Router();
router.route('/get-member')
    .get(isAdmin, memberController_1.default.getMember);
router.route('/update-member')
    .put(isAdmin, memberController_1.default.updateMember);
router.route('/delete-member/:id')
    .delete(isAdmin, memberController_1.default.deleteMember);
exports.default = router;
