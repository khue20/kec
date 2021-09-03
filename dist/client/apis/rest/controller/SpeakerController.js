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
const Speaker_1 = __importDefault(require("@/models/Speaker"));
const Path = process.env.SERVER_NAME || 'https://server.kec-lao.com/';
const speakerController = {
    getSpeaker: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getSpeaker = yield Speaker_1.default.find();
            const mapSpeaker = getSpeaker.map((i) => {
                return {
                    _id: i._id,
                    profile: Path + i.profile,
                    speakerName: i.speakerName,
                    companyName: i.companyName
                };
            });
            res.status(200).json({ mapSpeaker });
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
};
exports.default = speakerController;
