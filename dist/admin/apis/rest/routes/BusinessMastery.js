"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const businessMasteryController_1 = __importDefault(require("../controller/businessMasteryController"));
const router = express_1.Router();
router.route('/update-business')
    .put(isAdmin, businessMasteryController_1.default.updateBusinessMastery);
router.route('/get-business')
    .get(isAdmin, businessMasteryController_1.default.getBusinessMastery);
router.route('/delete-business/:id')
    .delete(isAdmin, businessMasteryController_1.default.deleteBusinessMastery);
router.route('/edit-business/:id')
    .get(isAdmin, businessMasteryController_1.default.editBusiness);
exports.default = router;
