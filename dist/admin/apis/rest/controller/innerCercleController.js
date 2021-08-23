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
const InnerCircle_1 = __importDefault(require("@/models/InnerCircle"));
const innerCercleController = {
    getInnerCercle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, perPage, search } = req.query;
        const newPage = parseInt(page);
        const newPerPage = parseInt(perPage);
        try {
            const addInnerCercle = yield InnerCircle_1.default.find({
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
            const getInner = addInnerCercle.map((i) => {
                return {
                    _id: i._id,
                    fullName: i.firstName + ' ' + i.lastName,
                    businessName: i.businessName,
                    contact: i.contactNumber,
                    website: i.website,
                    turnover: i.turNover,
                    noOfStaff: i.noOfStaff
                };
            });
            const counts = yield InnerCircle_1.default.find({
                $and: [
                    search ? {
                        $or: [
                            { firstName: { $regex: search.toLowerCase(), $options: 'i' } },
                            { businessName: { $regex: search, $options: 'i' } },
                        ]
                    } : {},
                ]
            }).countDocuments();
            res.status(200).json({ getInner, totals: counts });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    updateInner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, firstName, lastName, email, contactNumber, businessName, website, turNover, noOfStaff, descriptions } = req.body;
        try {
            const get_Update = yield InnerCircle_1.default.findOneAndUpdate(_id, {
                $set: {
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    businessName,
                    website,
                    turNover,
                    noOfStaff,
                    descriptions
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ get_Update });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield InnerCircle_1.default.findByIdAndDelete(id);
            res.status(200).json('Delete succeed');
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    editInner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield InnerCircle_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (e) {
            throw new Error(e);
        }
    })
};
exports.default = innerCercleController;
