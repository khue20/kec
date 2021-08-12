"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const eventControler_1 = __importDefault(require("../controller/eventControler"));
const router = express_1.Router();
router.route('/add-event')
    .post(isAdmin, eventControler_1.default.addEvent);
router.route('/get-event')
    .get(isAdmin, eventControler_1.default.getEvent);
router.route('/update-event')
    .put(isAdmin, eventControler_1.default.updateEvent);
router.route('/delete-event/:id')
    .delete(isAdmin, eventControler_1.default.deleteEvent);
router.route('/edit-event/:id')
    .get(isAdmin, eventControler_1.default.editEvent);
exports.default = router;
