"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDelete = void 0;
const logger_1 = __importDefault(require("../../../loaders/logger"));
const axios_1 = require("../../../services/axios");
const config_1 = __importDefault(require("../../../config"));
const database_1 = require("../../../loaders/database");
const handleDelete = async (req, res, next) => {
    try {
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
        await axios_1.problemInstance.delete(`/problems/${id}?access_token=${config_1.default.sphere.tokens.problem}`);
        await problemCollection.deleteOne({
            id: problemId,
        });
        res.status(201).json({
            success: true,
            message: 'Problem Deleted successful',
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
exports.handleDelete = handleDelete;
//# sourceMappingURL=delete.service.js.map