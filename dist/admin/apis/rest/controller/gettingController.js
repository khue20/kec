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
const GettingAndKeep_1 = __importDefault(require("@/models/GettingAndKeep"));
const gettingAndKeepController = {
    addGettingAndKeep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, date, bookTicketButtom, details } = req.body;
        try {
            const addGettingAndKeep = new GettingAndKeep_1.default({
                name, date, bookTicketButtom, details
            });
            yield addGettingAndKeep.save();
            res.status(200).json({ addGettingAndKeep });
        }
        catch (er) {
            return res.status(509).json({ message: er });
        }
    }),
    getGettingAndKeep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getGettingAndKeep = yield GettingAndKeep_1.default.find().sort('-createdAt');
            res.status(200).json({ getGettingAndKeep });
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    updateGettingAndKeep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, name, date, bookTicketButtom, details } = req.body;
        try {
            const Update = yield GettingAndKeep_1.default.findByIdAndUpdate(_id, {
                $set: {
                    name, date, bookTicketButtom, details
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ Update });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    deleteGetting: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield GettingAndKeep_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editGetting: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield GettingAndKeep_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = gettingAndKeepController;
