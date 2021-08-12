"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const gettingController_1 = __importDefault(require("../controller/gettingController"));
const router = express_1.Router();
router.route('/add-getting')
    .post(isAdmin, gettingController_1.default.addGettingAndKeep);
router.route('/get-getting')
    .get(isAdmin, gettingController_1.default.getGettingAndKeep);
router.route('/update-getting')
    .put(isAdmin, gettingController_1.default.updateGettingAndKeep);
router.route('/delete-getting/:id')
    .delete(isAdmin, gettingController_1.default.deleteGetting);
router.route('/edit-getting/:id')
    .get(isAdmin, gettingController_1.default.editGetting);
exports.default = router;
