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
        let { name, description, type, masterjudgeId, interactive } = req.body;
        if (!masterjudgeId) {
            masterjudgeId = 1000;
        }
        const { data } = await axios_1.problemInstance.post(`/problems?access_token=${config_1.default.sphere.tokens.problem}`, {
            name,
            body: description,
            typeId: type,
            masterjudgeId,
            interactive,
        });
        const DB = await database_1.DBInstance.getInstance();
        const problemCollection = await DB.getCollection('problems');
        const problem = Object.assign(Object.assign({}, data), { name, body: description, interactive,
            type, createdAt: new Date(), updatedAt: new Date() });
        const { insertedId } = await problemCollection.insertOne(problem);
        res.status(201).json(Object.assign(Object.assign({ success: true, message: 'Problem added successful' }, data), { _id: insertedId }));
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