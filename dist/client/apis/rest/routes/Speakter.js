"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SpeakerController_1 = __importDefault(require("../controller/SpeakerController"));
const router = express_1.Router();
router.route('/get-speaker')
    .get(SpeakerController_1.default.getSpeaker);
router.route('/sortorder')
    .put(SpeakerController_1.default.sortOrders);
exports.default = router;
