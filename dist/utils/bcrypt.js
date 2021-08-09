"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.genHash = void 0;
const bcrypt_1 = require("bcrypt");
exports.genHash = (plainTextPassword) => {
    return bcrypt_1.hashSync(plainTextPassword, 10);
};
exports.compareHash = (plainTextPassword, HashedPassword) => {
    return bcrypt_1.compareSync(plainTextPassword, HashedPassword);
};
