"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const bannerController_1 = __importDefault(require("../controller/bannerController"));
const router = express_1.Router();
router.route('/add-banner')
    .post(isAdmin, bannerController_1.default.addBanner);
router.route('/update-banner')
    .put(isAdmin, bannerController_1.default.updateBanner);
router.route('/get-banner')
    .get(isAdmin, bannerController_1.default.getBanner);
router.route('/delete-banner/:id')
    .delete(isAdmin, bannerController_1.default.deleteBanner);
exports.default = router;
