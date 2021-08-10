"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const masterMindController_1 = __importDefault(require("../controller/masterMindController"));
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const router = express_1.Router();
router.route('/get-mastermind')
    .get(isAdmin, masterMindController_1.default.getMasterMind);
router.route('/update-mastermind')
    .put(isAdmin, masterMindController_1.default.updateMastermind);
router.route('/delete-mastermind/:id')
    .delete(isAdmin, masterMindController_1.default.deleteMaster);
exports.default = router;
