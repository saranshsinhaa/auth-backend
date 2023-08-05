"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const logger_1 = __importDefault(require("./logger"));
const database_1 = require("./database");
exports.default = async ({ expressApp, }) => {
    await database_1.DBInstance.getInstance();
    logger_1.default.info('✅ DB loaded and connected!');
    const app = await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('🚀 Express loaded');
    logger_1.default.info('✅ All modules loaded!');
    return app;
};
//# sourceMappingURL=index.js.map