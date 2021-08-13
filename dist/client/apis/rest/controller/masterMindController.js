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
const nodemailer_1 = __importDefault(require("@/plugins/nodemailer"));
const User_1 = __importDefault(require("@/models/User"));
const masterMindController = {
    addMasterMind: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, contactNumber, businessName, reVenue, website } = req.body;
        try {
            const addMasterMind = new Mastermind_1.default({
                firstName,
                lastName,
                email,
                contactNumber,
                businessName,
                reVenue,
                website
            });
            const i = yield addMasterMind.save();
            const detail = {
                firstName: i.firstName,
                lastName: i.lastName,
                email: i.email,
                contactNumber: i.contactNumber,
                businessName: i.businessName,
                reVenue: i.reVenue,
                website: i.website
            };
            const mapUser = yield User_1.default.find();
            yield new Promise((resolve) => setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                mapUser.map((email) => __awaiter(void 0, void 0, void 0, function* () {
                    nodemailer_1.default.sendMail({
                        from: 'KATALYST',
                        to: email.email,
                        subject: `Mastermind`,
                        text: emailText(detail)
                    });
                }));
                resolve('succeed');
            }), 1000));
            res.status(200).json({ addMasterMind });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    })
};
const emailText = (detail) => `
Mastermind Group is currently FULL,
Details:
FirstName: ${detail.firstName},
Last Name: ${detail.lastName},
E-mail: ${detail.email},
ContactNumber: ${detail.contactNumber},
BusinessName: ${detail.businessName},
Website: ${detail.website},
ReVenue: ${detail.reVenue}
`;
exports.default = masterMindController;
