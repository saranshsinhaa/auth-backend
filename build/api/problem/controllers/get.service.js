"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFetch = void 0;
const logger_1 = __importDefault(require("../../../loaders/logger"));
const database_1 = require("../../../loaders/database");
const handleFetch = async (req, res, next) => {
    try {
        const DB = await database_1.DBInstance.getInstance();
        const problemCollection = await DB.getCollection('problems');
        const result = await problemCollection.find({}).toArray();
        res.status(201).json({
            success: true,
            message: 'Problem Fetched successful',
            data: result,
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
exports.handleFetch = handleFetch;
//# sourceMappingURL=get.service.js.map