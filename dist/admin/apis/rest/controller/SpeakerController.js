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
const speakerController = {
    addSpeaker: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { profile, speakerName, companyName } = req.body;
        try {
            const getsort = yield Speaker_1.default.findOne().sort('-sortOrder');
            if (!getsort) {
                const addSpeaker = new Speaker_1.default({
                    profile, speakerName, companyName
                });
                yield addSpeaker.save();
                res.status(200).json({ addSpeaker });
            }
            else {
                const addSpeaker = new Speaker_1.default({
                    profile, speakerName, companyName, sortOrder: getsort.sortOrder + 1
                });
                yield addSpeaker.save();
                res.status(200).json({ addSpeaker });
            }
        }
        catch (er) {
            return res.status(509).json({ message: er });
        }
    }),
    getSpeaker: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getSpeaker = yield Speaker_1.default.find();
            res.status(200).json({ getSpeaker });
        }
        catch (e) {
            res.status(500).send(e);
        }
    }),
    updateSpeaker: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, profile, speakerName, companyName } = req.body;
        try {
            const updateSpeaker = yield Speaker_1.default.findByIdAndUpdate(_id, {
                $set: {
                    profile, speakerName, companyName
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ updateSpeaker });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    deleteSpeaker: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Speaker_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editSpeaker: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield Speaker_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            res.status(500).send(er);
        }
    })
};
exports.default = speakerController;
