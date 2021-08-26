"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const PackageController_1 = __importDefault(require("../controller/PackageController"));
const router = express_1.Router();
router.route('/add-package')
    .post(isAdmin, PackageController_1.default.addPackage);
router.route('/get-package')
    .get(isAdmin, PackageController_1.default.getPackage);
router.route('/update-package')
    .put(isAdmin, PackageController_1.default.updatePackage);
router.route('/delete-package/:id')
    .delete(isAdmin, PackageController_1.default.deletePackage);
router.route('/edit-package/:id')
    .get(isAdmin, PackageController_1.default.editPackage);
exports.default = router;
