"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_service_1 = require("../../middleware/jwt.service");
const create_service_1 = require("./controllers/create.service");
const yupvalidator_1 = __importDefault(require("../../middleware/yupvalidator"));
const testCasesSchema_1 = require("../../models/testCasesSchema");
const casesRoutes = (0, express_1.Router)();
casesRoutes.post('/:id', jwt_service_1.validateJWT, jwt_service_1.isAdmin, (0, yupvalidator_1.default)('params', testCasesSchema_1.yupTestCasesParamSchema), (0, yupvalidator_1.default)('body', testCasesSchema_1.yupTestCasesBodySchema), create_service_1.handleCreate);
exports.default = casesRoutes;
//# sourceMappingURL=router.js.map