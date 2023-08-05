"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdate = void 0;
const logger_1 = __importDefault(require("../../../loaders/logger"));
const axios_1 = require("../../../services/axios");
const config_1 = __importDefault(require("../../../config"));
const database_1 = require("../../../loaders/database");
const handleUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
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
        await axios_1.problemInstance.put(`/problems/${id}?access_token=${config_1.default.sphere.tokens.problem}`, Object.assign({}, data));
        await problemCollection.updateOne({
            id: problemId,
        }, { $set: Object.assign(Object.assign({}, data), { updatedAt: new Date() }) });
        res.status(201).json({
            success: true,
            message: 'Problem Updated successful',
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
exports.handleUpdate = handleUpdate;
//# sourceMappingURL=update.service.js.map