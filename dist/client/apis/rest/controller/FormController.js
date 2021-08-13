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
    addForm: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { formCode, fullName, gender, mobile, facebookName, email, ownBusiness, packageChosen } = req.body;
        try {
            const form = new Form_1.default({
                formCode,
                fullName,
                gender,
                mobile,
                facebookName,
                email,
                ownBusiness,
                package: packageChosen
            });
            yield form.save();
            res.status(201).json({ form });
        }
        catch (e) {
            res.send(e);
        }
    })
};
exports.default = FormController;
