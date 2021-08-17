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
const User_1 = __importDefault(require("@/models/User"));
const nodemailer_1 = __importDefault(require("@/plugins/nodemailer"));
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
            const mapUser = yield User_1.default.find();
            yield new Promise((resolve) => setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                mapUser.map((email) => __awaiter(void 0, void 0, void 0, function* () {
                    nodemailer_1.default.sendMail({
                        from: 'KATALYST',
                        to: email.email,
                        subject: `${form.formCode} has new member registered`,
                        text: emailText(form)
                    });
                }));
                resolve('succeed');
            }), 1000));
            nodemailer_1.default.sendMail({
                from: 'KATALYST',
                to: form.email,
                subject: `ສະບາຍດີທ່ານ: ${form.fullName}`,
                text: `
 ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມໃນ KEC ຂອງພວກເຮົາ. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້. 
 Thank you for your interest in joining us at KEC. Once you have completed your information, our team will get in touch with you with more details.        
        
 ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
 Katalyst Partners
                `
            });
            res.status(201).json({ form });
        }
        catch (e) {
            res.send(e);
        }
    })
};
const emailText = (form) => `
New member's information:

Details: 
Full Name: ${form.fullName},
Gender: ${form.gender},
Mobile Number: ${form.mobile},
Facebook Name: ${form.facebookName},
Email Adress: ${form.email},
Own Business: ${form.ownBusiness},
Package: ${form.package}
`;
exports.default = FormController;
