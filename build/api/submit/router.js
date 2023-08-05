"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submit_service_1 = require("./contollers/submit.service");
const jwt_service_1 = require("../../middleware/jwt.service");
const yupvalidator_1 = __importDefault(require("../../middleware/yupvalidator"));
const submissionSchema_1 = require("../../models/submissionSchema");
const submissionRoutes = (0, express_1.Router)();
submissionRoutes.post('/', jwt_service_1.validateJWT, (0, yupvalidator_1.default)('body', submissionSchema_1.yupSubmitSchema), submit_service_1.handleSubmit);
exports.default = submissionRoutes;
//# sourceMappingURL=router.js.map