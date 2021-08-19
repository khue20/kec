"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FormController_1 = __importDefault(require("../controller/FormController"));
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const router = express_1.Router();
router.route('/get-forms')
    .get(isAdmin, FormController_1.default.getForms);
router.route('/get-form/:formId')
    .get(isAdmin, FormController_1.default.getForm);
router.route('/update-form')
    .put(isAdmin, FormController_1.default.updateForm);
router.route('/delete-form/:formId')
    .delete(isAdmin, FormController_1.default.deleteForm);
exports.default = router;
