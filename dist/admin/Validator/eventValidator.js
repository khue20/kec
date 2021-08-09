"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventValidation = void 0;
const eventValidation_1 = require("../Validations/eventValidation");
exports.eventValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield eventValidation_1.eventValidator.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }
    next();
});
