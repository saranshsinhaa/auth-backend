"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegister = void 0;
const logger_1 = __importDefault(require("../../../loaders/logger"));
const universal_service_1 = require("../../../services/universal.service");
const database_1 = require("../../../loaders/database");
const jwt_1 = require("../../../services/jwt");
const handleRegister = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const DB = await database_1.DBInstance.getInstance();
        const userCollection = await DB.getCollection('user');
        const userExists = await userCollection.findOne({ email });
        if (userExists) {
            throw {
                status: 409,
                message: 'User already exists',
            };
        }
        const hash = await (0, universal_service_1.hashed_password)(password);
        const user = {
            name,
            email,
            password: hash,
            // role,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const { insertedId } = await userCollection.insertOne(user);
        const payload = {
            name,
            email,
            // role,
            _id: insertedId,
        };
        const token = (0, jwt_1.generateJWT)(payload);
        res.status(201).json({
            success: true,
            message: 'Registration successful',
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
exports.handleRegister = handleRegister;
//# sourceMappingURL=register.service.js.map