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
const Banner_1 = __importDefault(require("@/models/Banner"));
const BannerType_1 = __importDefault(require("@/models/BannerType"));
const moment_1 = __importDefault(require("moment"));
const bannercontroller = {
    getBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { bannertype } = req.params;
        try {
            const now = moment_1.default(new Date()).locale('lo');
            const type = 'online';
            const types = {
                online: [
                    {
                        onlineDate: { $lte: now }
                    },
                    {
                        closeDate: { $gte: now }
                    },
                    { status: true }
                ]
            };
            const getId = yield BannerType_1.default.findOne({ name: bannertype });
            if (!getId)
                return res.status(409).json('This banner type does not exist!');
            const getBanner = yield Banner_1.default.find({
                $and: types[type],
                bannerTypeId: getId._id
            });
            res.status(200).json({ getBanner });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    })
};
exports.default = bannercontroller;
