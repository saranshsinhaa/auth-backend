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
Object.defineProperty(exports, "__esModule", { value: true });
exports.yupUpdateProblemBodySchema = exports.yupUpdateProblemParamSchema = exports.yupDeleteProblemSchema = exports.yupCreateProblemSchema = void 0;
const yup = __importStar(require("yup"));
exports.yupCreateProblemSchema = yup.object({
    name: yup.string().required().trim(),
    description: yup.string().required().trim(),
    type: yup
        .number()
        .min(0, 'Type of problem cannot be less than 0')
        .max(4, 'Type of problem cannot be greater than 4 : 0 - binary, 1 - minimize, 2 - maximize, 4 - percentage')
        .default(0),
    masterjudgeId: yup
        .number()
        .min(0, 'Master Judge ID of problem cannot be less than 0')
        .required(),
    interactive: yup.boolean().default(false),
});
exports.yupDeleteProblemSchema = yup.object({
    id: yup.string().required().min(5, 'Min ID length is 5').trim(),
});
exports.yupUpdateProblemParamSchema = yup.object({
    id: yup.string().required().min(5, 'Min ID length is 5').trim(),
});
exports.yupUpdateProblemBodySchema = yup.object({
    name: yup.string().trim(),
    description: yup.string().trim(),
    type: yup
        .number()
        .min(0, 'Type of problem cannot be less than 0')
        .max(4, 'Type of problem cannot be greater than 4 : 0 - binary, 1 - minimize, 2 - maximize, 4 - percentage'),
    masterjudgeId: yup
        .number()
        .min(0, 'Master Judge ID of problem cannot be less than 0'),
    interactive: yup.boolean(),
    activeTestcases: yup.string().trim(),
});
//# sourceMappingURL=problemsSchema.js.map