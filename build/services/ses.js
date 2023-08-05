"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../loaders/logger"));
const client_sesv2_1 = require("@aws-sdk/client-sesv2");
const ses = new client_sesv2_1.SESv2Client({
    region: config_1.default.awsRegion,
    credentials: {
        accessKeyId: config_1.default.awsID,
        secretAccessKey: config_1.default.awsKey,
    },
});
const sendEmail = async (data) => {
    //Teamplate for sending emails
    const templateString = `
    <!DOCTYPE html><html><head><meta charset=utf-8><title>Submission Result</title><style>*{margin:0;padding:0;box-sizing:border-box}body{padding:100px;width:100vw}p{margin:10px 0}h1{margin:30px 0}h2{margin:30px 0}li{list-style-type:none;font-weight:500}@media only screen and (max-width:768px){body{width:100%}h1{font-size:20px}p{font-size:16px}}</style></head><body><h1>Submission Result</h1><h3>Hi ${data.name},</h3><p>Your recent submission for the ${data.problemName} problem has been reviewed.</p><h2>Results</h2><ul><li>Status: ${data.status}</li><li>Score: ${data.score}</li><li>Time: ${data.time}</li><li>Memory: ${data.memory}</li></ul><h2>Details</h2><ul><li>Date: ${data.date}</li><li>Compiler Name: ${data.compilerName}</li><li>Compiler Version: ${data.compilerVersion}</li></ul></body></html>
    `;
    const params = {
        Destination: {
            ToAddresses: [data.email],
        },
        Content: {
            Simple: {
                Subject: {
                    Data: 'Submission Result details',
                },
                Body: {
                    Html: {
                        Data: templateString,
                    },
                },
                Text: {
                    Data: 'Submission Details',
                },
            },
        },
        FromEmailAddress: config_1.default.from,
    };
    try {
        await ses.send(new client_sesv2_1.SendEmailCommand(params));
        return { status: true, message: 'Email Sent Successfully!' };
    }
    catch (err) {
        logger_1.default.error(err);
        return { status: false, message: err };
    }
};
exports.default = sendEmail;
//# sourceMappingURL=ses.js.map