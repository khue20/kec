"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidator = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.eventValidator = joi_1.default.object({
    name: joi_1.default.string().required(),
    date: joi_1.default.date().required(),
    bookTiketButton: joi_1.default.string().required(),
    details: joi_1.default.string().required()
});
