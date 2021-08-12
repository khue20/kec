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
const jwt_1 = require("@/utils/jwt");
const User_1 = __importDefault(require("@/models/User"));
const bcrypt_1 = require("@/utils/bcrypt");
const userController = {
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, password } = req.body;
        // console.log(req.body)
        try {
            const isEmail = yield User_1.default.findOne({ email });
            if (isEmail)
                return res.status(409).json({ message: 'This email already registed!' });
            const genHashPassword = bcrypt_1.genHash(password);
            const addUsers = new User_1.default({
                firstName, lastName, email, password: genHashPassword, role: 'Admin'
            });
            yield addUsers.save();
            res.status(200).json({ addUsers });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const auth = req.user;
            const accessToken = jwt_1.signToken(auth);
            res.status(200).json({ accessToken });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const Users = yield User_1.default.find();
            const getUsers = Users.map((i) => {
                return {
                    _id: i._id,
                    firstName: i.firstName,
                    lastName: i.lastName,
                    email: i.email
                };
            });
            res.status(200).json({ getUsers });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, firstName, lastName, email } = req.body;
            const isCheck = yield User_1.default.findOne({ _id: _id, email: email });
            if (isCheck) {
                const updateUser = yield User_1.default.findByIdAndUpdate(_id, {
                    $set: {
                        firstName, lastName, email
                    }
                }, { runValidators: true, new: true });
                res.status(200).json({ updateUser });
            }
            else {
                const isEmail = yield User_1.default.findOne({ email });
                if (isEmail)
                    return res.status(409).json({ message: 'This email already registed!' });
                const updateUser = yield User_1.default.findByIdAndUpdate(_id, {
                    $set: {
                        firstName, lastName, email
                    }
                }, { runValidators: true, new: true });
                res.status(200).json({ updateUser });
            }
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    isBan: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let user = yield User_1.default.findById(id);
            let isBann = true;
            if (user.isBann)
                isBann = false;
            user = yield User_1.default.findByIdAndUpdate(id, {
                $set: {
                    isBann
                }
            }, { runValidators: true, new: true });
            res.status(200).json({ user });
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const isCheck = yield User_1.default.findById(id);
            if (!isCheck)
                return res.status(409).json({ message: 'This ID is null' });
            yield User_1.default.findByIdAndDelete(id);
            res.status(200).json('Deleted succeed');
        }
        catch (er) {
            throw new Error(er);
        }
    }),
    editUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const getEdit = yield User_1.default.findById(id);
            res.status(200).json({ getEdit });
        }
        catch (er) {
            throw new Error(er);
        }
    })
};
exports.default = userController;
