"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventAndGetting_1 = __importDefault(require("../controller/eventAndGetting"));
const router = express_1.Router();
router.route('/get-event')
    .get(eventAndGetting_1.default.getEvent);
router.route('/get-getting')
    .get(eventAndGetting_1.default.getGettingAndKeep);
exports.default = router;
