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
const Event_1 = __importDefault(require("@/models/Event"));
const eventController = {
    addEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, date, bookTicketButton, details } = req.body;
        try {
            const addEvents = new Event_1.default({
                name, date, bookTicketButton, details
            });
            yield addEvents.save();
            res.status(200).json({ addEvents });
        }
        catch (er) {
            return res.status(509).json({ message: er });
        }
    }),
    getEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getEvents = yield Event_1.default.find().sort('-createdAt');
            res.status(200).json({ getEvents });
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    updateEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, name, date, bookTicketButton, details } = req.body;
        try {
            const Update = yield Event_1.default.findByIdAndUpdate(_id, {
                $set: {
                    name, date, bookTicketButton, details
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ Update });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    deleteEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Event_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield Event_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = eventController;
