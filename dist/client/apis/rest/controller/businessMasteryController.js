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
const User_1 = __importDefault(require("@/models/User"));
const nodemailer_1 = __importDefault(require("@/plugins/nodemailer"));
const bannercontroller = {
    addBusinessMastery: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, gender, contactNumber, facebookName, email, businessName } = req.body;
        try {
            const addBusiness = new BusinessMastery_1.default({
                firstName, lastName, gender, contactNumber, facebookName, email, businessName
            });
            yield addBusiness.save();
            const isEmail = yield User_1.default.find();
            yield new Promise((resolve) => setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                isEmail.map((email) => __awaiter(void 0, void 0, void 0, function* () {
                    nodemailer_1.default.sendMail({
                        from: 'KATALYST',
                        to: email.email,
                        subject: `Business Mastery has new member registered `,
                        text: emailText(addBusiness)
                    });
                }));
                resolve('succeed');
            }), 1000));
            //send to user
            nodemailer_1.default.sendMail({
                from: 'KATALYST',
                to: addBusiness.email,
                subject: `ສະບາຍດີທ່ານ, ${addBusiness.firstName} ${addBusiness.lastName}`,
                text: `
ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມງານ Business Mastery ຂອງພວກເຮົາ ເຊິ່ງເປັນງານທໍາອິດທີ່ຈັດຂຶ້ນໃນ ສປປ ລາວ ແລະ ຈະຈັດຂຶ້ນຢູ່ທີ່ ນະຄອນຫຼວງວຽງຈັນ, ໂຮງແຮມ ຄຣາວ ພລາຊ່າ ວຽງຈັນ, ໃນວັນທີ 2 – 3 ຕຸລາ 2021. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້.
Thank you for your interest in joining us at Business Mastery in Vientiane on 2-3 October 2021 and being part of the first event of its kind in Lao PDR. Once you have completed your information, our team will get in touch with you with more details.
      
ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
Katalyst Partners

`
            });
            res.status(200).json({ addBusiness });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    })
};
const emailText = (addBusiness) => `
New member details:

First Name: ${addBusiness.firstName},
Last Name: ${addBusiness.lastName},
Gender: ${addBusiness.gender},
E-mail: ${addBusiness.email},
Contact Number: ${addBusiness.contactNumber},
Facebook Name: ${addBusiness.facebookName},
Business Name: ${addBusiness.businessName}
`;
exports.default = bannercontroller;
