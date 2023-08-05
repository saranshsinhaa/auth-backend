"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const bcrypt = __importStar(require("bcrypt"));
const logger_1 = __importDefault(require("../../../loaders/logger"));
const database_1 = require("../../../loaders/database");
const jwt_1 = require("../../../services/jwt");
const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const DB = await database_1.DBInstance.getInstance();
        const userCollection = await DB.getCollection('user');
        const user = await userCollection.findOne({ email });
        if (!user) {
            throw {
                status: 404,
                message: 'User not found',
            };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw {
                status: 401,
                message: 'Invalid credentials',
            };
        }
        const payload = {
            name: user.name,
            email: user.email,
            _id: user._id,
        };
        const token = (0, jwt_1.generateJWT)(payload);
        res.status(201).json({
            success: true,
            message: 'Login successful',
            email,
            token,
        });
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.handleLogin = handleLogin;
//# sourceMappingURL=login.service.js.map