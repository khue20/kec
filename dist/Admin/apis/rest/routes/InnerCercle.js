"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const innerCercleController_1 = __importDefault(require("../controller/innerCercleController"));
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const router = express_1.Router();
router.route('/get-innercercle')
    .get(isAdmin, innerCercleController_1.default.getInnerCercle);
router.route('/update-inner')
    .put(isAdmin, innerCercleController_1.default.updateInner);
router.route('/delete-inner/:id')
    .delete(isAdmin, innerCercleController_1.default.delete);
exports.default = router;
