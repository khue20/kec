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
const BusinessMastery_1 = __importDefault(require("@/models/BusinessMastery"));
const bannercontroller = {
    updateBusinessMastery: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, firstName, lastName, gender, contactNumber, facebookName, email, businessName } = req.body;
        try {
            const updateBusiness = yield BusinessMastery_1.default.findByIdAndUpdate(_id, {
                $set: {
                    firstName,
                    lastName,
                    gender,
                    contactNumber,
                    facebookName,
                    email,
                    businessName
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ updateBusiness });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    getBusinessMastery: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getBusiness = yield BusinessMastery_1.default.find().sort('-createdAt');
            res.status(200).json({ getBusiness });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    deleteBusinessMastery: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield BusinessMastery_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editBusiness: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield BusinessMastery_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = bannercontroller;
