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
const bannercontroller = {
    addBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { image, url, bannerTypeId, onlineDate, closeDate } = req.body;
        try {
            const addBanners = new Banner_1.default({
                image, url, bannerTypeId, onlineDate, closeDate
            });
            yield addBanners.save();
            res.status(200).json({ addBanners });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    updateBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, image, url, bannerTypeId, onlineDate, closeDate } = req.body;
        try {
            const updateBanner = yield Banner_1.default.findByIdAndUpdate(_id, {
                $set: {
                    image, url, bannerTypeId, onlineDate, closeDate
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ updateBanner });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    getBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getBanner = yield Banner_1.default.find().sort('-createdAt');
            res.status(200).json({ getBanner });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    deleteBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Banner_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    editBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield Banner_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
};
exports.default = bannercontroller;
