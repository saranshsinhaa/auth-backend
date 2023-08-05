"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const generateJWT = (payload) => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);
    return (0, jsonwebtoken_1.sign)(Object.assign(Object.assign({}, payload), { exp: expirationDate.getTime() / 1000 }), config_1.default.jwtSecret);
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map