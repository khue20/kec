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
const GettingAndKeep_1 = __importDefault(require("@/models/GettingAndKeep"));
const moment_1 = __importDefault(require("moment"));
const eventAndGettingController = {
    getEvent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getEvents = yield Event_1.default.find().sort('-createdAt');
            const mapper = getEvents.map((i) => {
                return {
                    _id: i._id,
                    name: i.name,
                    date: moment_1.default(i.date).locale('lo').format('YYYY-MM-DD'),
                    bookTicketButton: i.bookTicketButton,
                    details: i.details
                };
            });
            res.status(200).json({ mapper });
        }
        catch (e) {
            throw new Error(e);
        }
    }),
    getGettingAndKeep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getGettingAndKeep = yield GettingAndKeep_1.default.find().sort('-createdAt');
            const mapper = getGettingAndKeep.map((i) => {
                return {
                    _id: i._id,
                    name: i.name,
                    date: moment_1.default(i.date).locale('lo').format('YYYY-MM-DD'),
                    bookTicketButtom: i.bookTicketButtom,
                    details: i.details
                };
            });
            res.status(200).json({ mapper });
        }
        catch (e) {
            throw new Error(e);
        }
    }),
};
exports.default = eventAndGettingController;
