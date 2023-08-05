"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const os_1 = __importDefault(require("os"));
const logger_1 = __importDefault(require("../loaders/logger"));
const healthCheckRoute = (0, express_1.Router)();
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const formatTime = (seconds) => {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = Math.floor(seconds % 60);
    return `${pad(hours)} : ${pad(minutes)} : ${pad(secs)}`;
};
healthCheckRoute.get('/', async (req, res, next) => {
    try {
        const healthCheckData = {
            message: '🛠️ API Working 🛠️',
            timestamp: today.toUTCString(),
            architecture: os_1.default.arch(),
            totalMemory: os_1.default.totalmem(),
            freeMemory: os_1.default.freemem(),
            platform: os_1.default.platform(),
            osType: os_1.default.type(),
            osRelease: os_1.default.release(),
            osVersion: os_1.default.version(),
            hostname: os_1.default.hostname(),
            userInfo: os_1.default.userInfo(),
            serverUptime: formatTime(process.uptime()),
            osUptime: formatTime(os_1.default.uptime()),
            reqIP: req.ip,
        };
        res.status(200).json({ status: true, message: healthCheckData });
        next();
    }
    catch (e) {
        logger_1.default.error('🔥 error: %o', e);
        res.status(503).json({
            success: false,
            message: '🚫 API Health Check Failed 🚫',
        });
    }
});
exports.default = healthCheckRoute;
//# sourceMappingURL=healthcheck.js.map