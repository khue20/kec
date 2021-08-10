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
const nodemailer_1 = __importDefault(require("@/plugins/nodemailer"));
const memberController = {
    registerMember: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, contactNumber, businessName, reason, memberShipOption } = req.body;
        try {
            const addMember = new Member_1.default({
                firstName,
                lastName,
                email,
                contactNumber,
                businessName,
                reason,
                memberShipOption
            });
            yield addMember.save();
            const datas = {
                firstName: addMember.firstName,
                lastName: addMember.lastName,
                email: addMember.email,
                contactNumber: addMember.contactNumber,
                businessName: addMember.businessName,
                reason: addMember.reason,
                memberShipOption: addMember.memberShipOption
            };
            nodemailer_1.default.sendMail({
                from: 'KATALYST',
                to: 'ncomusibsim7@gmail.com',
                subject: `Member`,
                text: emailText(datas)
            });
            res.status(200).json({ addMember });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    })
};
const emailText = (datas) => `
Mastermin Group is currently FULL,
Details:
FirstName: ${datas.firstName},
Last Name: ${datas.lastName},
E-mail: ${datas.email},
ContactNumber: ${datas.contactNumber},
BusinessName: ${datas.businessName},
Reason to join KEC: ${datas.reason},
MemberShipOption: ${datas.memberShipOption}
`;
exports.default = memberController;
