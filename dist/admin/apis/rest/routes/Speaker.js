"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const isAdmin = passport_1.authenticate('isAdmin', { session: false });
const SpeakerController_1 = __importDefault(require("../controller/SpeakerController"));
const router = express_1.Router();
router.route('/add-speaker')
    .post(isAdmin, SpeakerController_1.default.addSpeaker);
router.route('/get-speaker')
    .get(isAdmin, SpeakerController_1.default.getSpeaker);
router.route('/update-speaker')
    .put(isAdmin, SpeakerController_1.default.updateSpeaker);
router.route('/delete-speaker/:id')
    .delete(isAdmin, SpeakerController_1.default.deleteSpeaker);
router.route('/edit-speaker/:id')
    .get(isAdmin, SpeakerController_1.default.editSpeaker);
exports.default = router;
