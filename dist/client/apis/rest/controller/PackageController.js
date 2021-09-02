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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Package_1 = __importDefault(require("@/models/Package"));
const packageController = {
    getPackage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getPackage = yield Package_1.default.find();
            res.status(200).json({ getPackage });
        }
        catch (e) {
            res.status(509).send(e);
        }
    }),
    getSpecialPrice: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getPackage = yield Package_1.default.find();
            const getSpecialPrice = getPackage.map((i) => {
                return {
                    _id: i._id,
                    ticket: i.ticket,
                    price: i.price,
                    originPrice: i.originPrice
                };
            });
            res.status(200).json({ getSpecialPrice });
        }
        catch (e) {
            res.status(509).send(e);
        }
    })
};
exports.default = packageController;
