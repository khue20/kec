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
const Member_1 = __importDefault(require("@/models/Member"));
const memberController = {
    getMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, perPage, search } = req.body;
        const newPage = parseInt(page);
        const newPerPage = parseInt(perPage);
        try {
            const getMembers = yield Member_1.default.find({
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
            const getMember = getMembers.map((i) => {
                return {
                    _id: i._id,
                    fullName: i.firstName + ' ' + i.lastName,
                    businessName: i.businessName,
                    contact: i.contactNumber,
                    reason: i.reason,
                    memberShipOption: i.memberShipOption
                };
            });
            res.status(200).json({ getMember });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    updateMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, firstName, lastName, email, contactNumber, businessName, reason, memberShipOption } = req.body;
        try {
            const updateMember = yield Member_1.default.findByIdAndUpdate(_id, {
                $set: {
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    businessName,
                    reason,
                    memberShipOption
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ updateMember });
        }
        catch (error) {
            return res.status(409).json({ message: error });
        }
    }),
    deleteMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Member_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = memberController;
