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
const Mastermind_1 = __importDefault(require("@/models/Mastermind"));
const masterMindController = {
    getMasterMind: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, perPage, search } = req.query;
        const newPage = parseInt(page);
        const newPerPage = parseInt(perPage);
        try {
            const getMasterMind = yield Mastermind_1.default.find({
                $and: [
                    search ? {
                        $or: [
                            { firstName: { $regex: search.toLowerCase(), $options: 'i' } },
                            { businessName: { $regex: search, $options: 'i' } },
                        ]
                    } : {},
                ]
            })
                .skip((newPage * newPerPage) - newPerPage)
                .limit(newPerPage)
                .sort('-createdAt');
            const getMaster = getMasterMind.map((i) => {
                return {
                    _id: i._id,
                    fullName: i.firstName + ' ' + i.lastName,
                    businessName: i.businessName,
                    contact: i.contactNumber,
                    reVenue: i.reVenue,
                    website: i.website
                };
            });
            res.status(200).json({ getMaster });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    updateMastermind: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, firstName, lastName, email, contactNumber, businessName, reVenue, website } = req.body;
        try {
            const addMasterMind = yield Mastermind_1.default.findByIdAndUpdate(_id, {
                $set: {
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    businessName,
                    reVenue,
                    website
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ addMasterMind });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    deleteMaster: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Mastermind_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editMaster: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield Mastermind_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = masterMindController;
