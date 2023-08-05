"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("../config"));
const api_1 = __importDefault(require("../api"));
const logger_1 = __importDefault(require("./logger"));
exports.default = ({ app }) => {
    app.get('/healthcheck', (req, res) => {
        const healthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
        };
        try {
            return res.json(healthCheck);
        }
        catch (e) {
            return res.status(503).send();
        }
    });
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');
    app.use((0, helmet_1.default)()); // Middleware that helps secure app by setting headers
    app.use((0, cors_1.default)()); //Enable Cross Origin Resource Sharing to all origins by default
    app.use(express_1.default.json({ limit: '2mb' })); // Middleware that transforms the raw string of req.body into json
    app.use(config_1.default.api.prefix, (0, api_1.default)()); // Load API routes
    app.use((err, req, res, next) => {
        logger_1.default.error(err);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || '🔌 Unknown Server Error Occurred 🔌',
            display: err.display || 'Null',
        });
    });
    return app;
};
//# sourceMappingURL=express.js.map