"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
exports.default = {
    port: parseInt(process.env.PORT) || 5050,
    dbURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    dbName: process.env.MONGODB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    awsID: process.env.AWS_ACCESS_KEY_ID,
    awsKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_DEFAULT_REGION,
    from: process.env.EMAIL_FROM,
    replyTo: process.env.EMAIL_REPLY_TO,
    logs: {
        level: process.env.LOG_LEVEL || 'silly', // Logger Level
    },
    sphere: {
        urls: {
            problem: `https://${process.env.SPHERE_ACCOUNT_ID}.problems.sphere-engine.com/api/v4`,
            compile: `https://${process.env.SPHERE_ACCOUNT_ID}.compilers.sphere-engine.com/api/v4`,
        },
        tokens: {
            problem: process.env.SPHERE_PROBLEM_API_KEY,
            compile: process.env.SPHERE_COMPILERS_API_KEY,
        },
    },
    api: {
        prefix: '/api', // API Prefix
    },
};
//# sourceMappingURL=index.js.map