"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreate = void 0;
const logger_1 = __importDefault(require("../../../loaders/logger"));
const axios_1 = require("../../../services/axios");
const config_1 = __importDefault(require("../../../config"));
const database_1 = require("../../../loaders/database");
const handleCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const problemId = parseInt(id);
        const DB = await database_1.DBInstance.getInstance();
        const problemCollection = await DB.getCollection('problems');
        const problemExist = await problemCollection.findOne({
            id: problemId,
        });
        if (!problemExist) {
            throw {
                status: 404,
                message: 'Problem not found',
            };
        }
        const { data } = await axios_1.problemInstance.post(`/problems/${id}/testcases?access_token=${config_1.default.sphere.tokens.problem}`, Object.assign({}, body));
        const testCase = Object.assign(Object.assign({}, data), { createdAt: new Date(), updatedAt: new Date() });
        await problemCollection.updateOne({
            id: problemId,
        }, { $push: { testCases: testCase } });
        res.status(201).json(Object.assign({ success: true, message: 'Test Case added successful' }, data));
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.handleCreate = handleCreate;
//# sourceMappingURL=create.service.js.map