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
const Package_1 = __importDefault(require("@/models/Package"));
const packageController = {
    addPackage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { ticket, price, qty } = req.body;
        try {
            const isCheck = yield Package_1.default.findOne({ ticket });
            if (isCheck)
                return res.status(409).json({ message: 'Duplicate ticket' });
            const addPackage = new Package_1.default({
                ticket, price, qty
            });
            yield addPackage.save();
            res.status(200).json({ addPackage });
        }
        catch (er) {
            return res.status(509).json({ message: er });
        }
    }),
    getPackage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getPackage = yield Package_1.default.find();
            const mapper = getPackage.map((i) => {
                return {
                    _id: i._id,
                    ticket: i.ticket,
                    price: i.price,
                    qty: i.qty.join(', ')
                };
            });
            res.status(200).json({ mapper });
        }
        catch (e) {
            res.status(500).send(e);
        }
    }),
    updatePackage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, ticket, price, qty } = req.body;
        try {
            const updatePackage = yield Package_1.default.findByIdAndUpdate(_id, {
                $set: {
                    ticket, price, qty
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ updatePackage });
        }
        catch (er) {
            return res.status(409).json({ message: er });
        }
    }),
    deletePackage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Package_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editPackage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getEdit = yield Package_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            res.status(500).send(er);
        }
    })
};
exports.default = packageController;
