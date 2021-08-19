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
const Form_1 = __importDefault(require("@/models/Form"));
const FormController = {
    getForms: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { page, perPage, search, formCode } = req.query;
        const newPage = parseInt(page);
        const newPerPage = parseInt(perPage);
        try {
            const forms = yield Form_1.default.find({
                $and: [
                    search ? {
                        $or: [
                            { fullName: { $regex: search.toLowerCase(), $options: 'i' } },
                        ]
                    } : {},
                    {
                        formCode: formCode
                    }
                ]
            }).skip((newPage * newPerPage) - newPerPage)
                .limit(newPerPage)
                .sort('-createdAt');
            res.status(201).json({ forms });
        }
        catch (e) {
            res.status(500).send(e);
        }
    }),
    getForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { formId } = req.params;
        try {
            const form = yield Form_1.default.findById({ _id: formId });
            res.status(200).json({ form });
        }
        catch (e) {
            res.status(500).send(e);
        }
    }),
    updateForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { formId, formCode, fullName, gender, mobile, 
        // facebookName,
        email, ownBusiness } = req.body;
        try {
            const form = yield Form_1.default.findByIdAndUpdate(formId, {
                formCode,
                fullName,
                gender,
                mobile,
                // facebookName,
                email,
                ownBusiness
            }, { runValidators: true, new: true });
            res.status(200).json({ form });
        }
        catch (e) {
            res.send(e);
        }
    }),
    deleteForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { formId } = req.params;
            yield Form_1.default.findByIdAndDelete({ _id: formId });
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            res.status(500).send(er);
        }
    })
};
exports.default = FormController;
