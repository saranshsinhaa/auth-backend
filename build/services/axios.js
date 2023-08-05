"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSphere = exports.problemInstance = exports.compileInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../loaders/logger"));
exports.compileInstance = axios_1.default.create({
    baseURL: config_1.default.sphere.urls.compile,
});
exports.problemInstance = axios_1.default.create({
    baseURL: config_1.default.sphere.urls.problem,
});
const testSphere = async () => {
    try {
        const compilerTest = await exports.compileInstance.get('/test', {
            params: {
                access_token: config_1.default.sphere.tokens.compile,
            },
        });
        const problemTest = await exports.problemInstance.get('/test', {
            params: {
                access_token: config_1.default.sphere.tokens.problem,
            },
        });
        const compilerMessage = compilerTest.data.message;
        const problemMessage = problemTest.data.message;
        return {
            compiler: {
                status: compilerTest.status,
                message: compilerMessage,
            },
            problem: {
                status: problemTest.status,
                message: problemMessage,
            },
        };
    }
    catch (error) {
        logger_1.default.error('🔥 error: %o', error);
        return {
            compiler: {
                status: error.response.status,
                message: error.response.data.message,
            },
            problem: {
                status: error.response.status,
                message: error.response.data.message,
            },
        };
    }
};
exports.testSphere = testSphere;
//# sourceMappingURL=axios.js.map