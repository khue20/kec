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
const InnerCircle_1 = __importDefault(require("../../../../models/InnerCircle"));
const nodemailer_1 = __importDefault(require("../../../../plugins/nodemailer"));
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
            const detail = {
                lastName: addInnerCercle.lastName,
                email: addInnerCercle.email,
                contactNumber: addInnerCercle.contactNumber,
                businessName: addInnerCercle.businessName,
                website: addInnerCercle.website,
                turNover: addInnerCercle.turNover,
                noOfStaff: addInnerCercle.noOfStaff,
                descriptions: addInnerCercle.descriptions
            };
            nodemailer_1.default.sendMail({
                from: 'KATALYST',
                to: 'ncomusibsim7@gmail.com',
                subject: `Inner Circle`,
                text: emailText(detail)
            });
            res.status(200).json({ addInnerCercle });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    })
};
const emailText = (detail) => `
Join the Inner Cirlce Waiting List,
Details:
firstName: ${detail.firstName},
lastName: ${detail.lastName},
email:${detail.email},
contactNumber: ${detail.contactNumber},
businessName: ${detail.businessName},
website: ${detail.website},
turNover: ${detail.turNover},
No. of Staff: ${detail.noOfStaff},
descriptions: ${detail.descriptions}
`;
exports.default = innerCercleController;
