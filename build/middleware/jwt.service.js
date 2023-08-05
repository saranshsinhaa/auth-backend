"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.validateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = __importDefault(require("../config/index"));
const middlewareSchema_1 = require("../models/middlewareSchema");
const logger_1 = __importDefault(require("../loaders/logger"));
// used for validating JWT token
const validateJWT = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return next({
                statusCode: 401,
                message: 'No JWT authorization Token available',
            });
        }
        await middlewareSchema_1.yupJwtHeader.validate(req.headers, { abortEarly: false });
        const authToken = authorization.split(' ')[1];
        const decoded = (0, jsonwebtoken_1.verify)(authToken, index_1.default.jwtSecret);
        const { role } = decoded;
        if (role !== 'admin' && role !== 'participant') {
            return next({
                statusCode: 403,
                message: 'Unauthorized',
            });
        }
        const stringed = JSON.stringify(decoded);
        req.user = JSON.parse(stringed);
        next();
    }
    catch (err) {
        logger_1.default.error(err);
        if (err.name === 'ValidationError') {
            let message = '';
            err.errors.forEach((error) => {
                message += `${error}.\n `;
            });
            return next({
                statusCode: 404,
                message: message,
            });
        }
        next({
            statusCode: 403,
            message: `${err.name}: ${err.message}`,
        });
    }
};
exports.validateJWT = validateJWT;
// For differentiating between admin and participant
const isAdmin = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return next({
                statusCode: 403,
                message: 'Unauthorized',
            });
        }
        next();
    }
    catch (err) {
        logger_1.default.error(err);
        next({
            statusCode: 403,
            message: `${err.name}: ${err.message}`,
        });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=jwt.service.js.map