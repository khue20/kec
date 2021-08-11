"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const bannerTypeController_1 = __importDefault(require("../controller/bannerTypeController"));
const router = express_1.Router();
router.route('/add-bannertype/:name')
    .post(isAdmin, bannerTypeController_1.default.addBannertype);
router.route('/update-bannertype')
    .put(isAdmin, bannerTypeController_1.default.updateBannerType);
router.route('/get-bannertype')
    .get(isAdmin, bannerTypeController_1.default.getBannerType);
router.route('/delete-bannertype/:id')
    .delete(isAdmin, bannerTypeController_1.default.deleteBannerType);
exports.default = router;
