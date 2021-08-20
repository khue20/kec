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
const User_1 = __importDefault(require("@/models/User"));
const InnerCircle_1 = __importDefault(require("@/models/InnerCircle"));
const nodemailer_1 = __importDefault(require("@/plugins/nodemailer"));
const innerCercleController = {
    insertInnerCercle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, contactNumber, businessName, website, turNover, noOfStaff, descriptions } = req.body;
        try {
            const addInnerCercle = new InnerCircle_1.default({
                firstName,
                lastName,
                email,
                contactNumber,
                businessName,
                website,
                turNover,
                noOfStaff,
                descriptions
            });
            yield addInnerCercle.save();
            const details = {
                firstName: addInnerCercle.firstName,
                lastName: addInnerCercle.lastName,
                email: addInnerCercle.email,
                contactNumber: addInnerCercle.contactNumber,
                businessName: addInnerCercle.businessName,
                website: addInnerCercle.website,
                turNover: addInnerCercle.turNover,
                noOfStaff: addInnerCercle.noOfStaff,
                descriptions: addInnerCercle.descriptions
            };
            const mapUser = yield User_1.default.find();
            yield new Promise((resolve) => setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                mapUser.map((email) => __awaiter(void 0, void 0, void 0, function* () {
                    nodemailer_1.default.sendMail({
                        from: 'KATALYST',
                        to: email.email,
                        subject: `Inner Circle has new member registered`,
                        text: emailText(details)
                    });
                }));
                resolve('succeed');
            }), 1000));
            nodemailer_1.default.sendMail({
                from: 'KATALYST',
                to: addInnerCercle.email,
                subject: `ສະບາຍດີທ່ານ, ${addInnerCercle.firstName}  ${addInnerCercle.lastName}`,
                text: `
ຂອບໃຈທ່ານ ທີ່ສົນໃຈເຂົ້າຮ່ວມບັນຊີລໍຖ້າຂອງ Inner Circle ນໍາພວກເຮົາ. ພາຍຫຼັງທີ່ທ່ານຕື່ມຂໍ້ມູນຂອງທ່ານແລ້ວ ທາງທີມງານເຮົາຈະສົ່ງລາຍລະອຽດຂອງງານໃຫ້ທ່ານຊາບໃນໄວໆນີ້.
Thank you for your interest in joining us as waiting list on Inner Circle. Once you have completed your information, our team will get in touch with you with more details.

ພວກເຮົາຍິນດີໃຫ້ບໍລິການທ່ານ,
Katalyst Partners
        `
            });
            res.status(200).json({ addInnerCercle });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    })
};
const emailText = (details) => `
ລາຍລະອຽດຂໍ້ມູນສະມາຊິກໃໝ່:

ຊື່: ${details.firstName},
ນາມສະກຸນ: ${details.lastName},
ອິເມວ: ${details.email},
ເບີຕິດຕໍ່: ${details.contactNumber},
ຊື່ທຸລະກິດ: ${details.businessName},
ເວັບໄຊທ: ${details.website},
ລາຍຮັບປະຈໍາປີ ຫຼື ມູນຄ່າທຸລະກິດ: ${details.turNover},
ຈຳນວນພະນັກງານ: ${details.noOfStaff},
ລາຍລະອຽດ: ${details.descriptions}
`;
// const emailText = (details: any) => `
// New member details:
// FirstName: ${details.firstName},
// LastName: ${details.lastName},
// E-mail: ${details.email},
// ContactNumber: ${details.contactNumber},
// BusinessName: ${details.businessName},
// Website: ${details.website},
// TurNover: ${details.turNover},
// No. of Staff: ${details.noOfStaff},
// Descriptions: ${details.descriptions}
// `
exports.default = innerCercleController;
