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
const BannerType_1 = __importDefault(require("@/models/BannerType"));
const bannerTypecontroller = {
    addBannertype: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.params;
        try {
            const addBannertypes = new BannerType_1.default({
                name
            });
            yield addBannertypes.save();
            res.status(200).json({ addBannertypes });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    getBannerType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getBannerType = yield BannerType_1.default.find();
            res.status(200).json({ getBannerType });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    updateBannerType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, name } = req.body;
            yield BannerType_1.default.findByIdAndUpdate(_id, {
                $set: {
                    name
                }
            }, { runValidators: true, new: true });
            res.status(200).json('Update succeed');
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    deleteBannerType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield BannerType_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = bannerTypecontroller;
