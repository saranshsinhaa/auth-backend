"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_service_1 = require("./controllers/login.service");
const register_service_1 = require("./controllers/register.service");
const yupvalidator_1 = __importDefault(require("../../middleware/yupvalidator"));
const authSchema_1 = require("../../models/authSchema");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/login', (0, yupvalidator_1.default)('body', authSchema_1.yupLoginSchema), login_service_1.handleLogin);
authRoutes.post('/register', (0, yupvalidator_1.default)('body', authSchema_1.yupRegisterSchema), register_service_1.handleRegister);
exports.default = authRoutes;
//# sourceMappingURL=router.js.map