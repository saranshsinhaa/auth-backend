"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_service_1 = require("../../middleware/jwt.service");
const create_service_1 = require("./controllers/create.service");
const delete_service_1 = require("./controllers/delete.service");
const update_service_1 = require("./controllers/update.service");
const get_service_1 = require("./controllers/get.service");
const yupvalidator_1 = __importDefault(require("../../middleware/yupvalidator"));
const problemsSchema_1 = require("../../models/problemsSchema");
const problemRoutes = (0, express_1.Router)();
problemRoutes.get('/', jwt_service_1.validateJWT, get_service_1.handleFetch);
problemRoutes.post('/', jwt_service_1.validateJWT, jwt_service_1.isAdmin, (0, yupvalidator_1.default)('body', problemsSchema_1.yupCreateProblemSchema), create_service_1.handleCreate);
problemRoutes.delete('/:id', jwt_service_1.validateJWT, jwt_service_1.isAdmin, (0, yupvalidator_1.default)('params', problemsSchema_1.yupDeleteProblemSchema), delete_service_1.handleDelete);
problemRoutes.put('/:id', jwt_service_1.validateJWT, jwt_service_1.isAdmin, (0, yupvalidator_1.default)('params', problemsSchema_1.yupUpdateProblemParamSchema), (0, yupvalidator_1.default)('body', problemsSchema_1.yupUpdateProblemBodySchema), update_service_1.handleUpdate);
exports.default = problemRoutes;
//# sourceMappingURL=router.js.map