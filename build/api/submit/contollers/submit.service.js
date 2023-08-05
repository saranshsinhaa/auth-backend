"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSubmit = void 0;
const logger_1 = __importDefault(require("../../../loaders/logger"));
const axios_1 = require("../../../services/axios");
const config_1 = __importDefault(require("../../../config"));
const database_1 = require("../../../loaders/database");
const universal_service_1 = require("../../../services/universal.service");
const ses_1 = __importDefault(require("../../../services/ses"));
const handleSubmit = async (req, res, next) => {
    try {
        const data = req.body;
        const DB = await database_1.DBInstance.getInstance();
        const problemCollection = await DB.getCollection('problems');
        const problemExist = await problemCollection.findOne({
            id: data.problemId,
        });
        if (!problemExist) {
            throw {
                status: 404,
                message: 'Problem not found',
            };
        }
        const testCases = problemExist.testCases.map((testCase) => {
            return testCase.number;
        });
        const tests = testCases.join(',');
        const submit = await axios_1.problemInstance.post(`/submissions?access_token=${config_1.default.sphere.tokens.problem}`, Object.assign(Object.assign({}, data), { tests }));
        // Making first status request to problem
        await (0, universal_service_1.sleep)(2000);
        let submitRes = (await axios_1.problemInstance.get(`/submissions/${submit.data.id}?access_token=${config_1.default.sphere.tokens.problem}`)).data;
        // Making status request until execution is finished in interval of 2 seconds
        while (submitRes.executing === true) {
            await (0, universal_service_1.sleep)(2000);
            submitRes = (await axios_1.problemInstance.get(`/submissions/${submit.data.id}?access_token=${config_1.default.sphere.tokens.problem}`)).data;
        }
        const output = {
            problem: submitRes.problem.name,
            status: {
                executing: submitRes.executing,
                date: submitRes.date,
            },
            compiler: {
                name: submitRes.compiler.name,
                version: submitRes.compiler.version.name,
            },
            result: {
                score: submitRes.result.score,
                status: submitRes.result.status.name,
                time: submitRes.result.time,
                memory: submitRes.result.memory,
            },
            tests: submitRes.result.testcases
                ? submitRes.result.testcases.map((test) => {
                    return {
                        number: test.number,
                        status: test.status.name,
                        score: test.score,
                        time: test.time,
                        memory: test.memory,
                        output: test.output,
                    };
                })
                : [],
        };
        const emailData = {
            email: req.user.email,
            name: req.user.name,
            problemName: submitRes.problem.name,
            status: submitRes.result.status.name,
            score: submitRes.result.score,
            time: submitRes.result.time,
            memory: submitRes.result.memory,
            compilerName: submitRes.compiler.name,
            compilerVersion: submitRes.compiler.version.name,
            date: submitRes.date,
        };
        const { status } = await (0, ses_1.default)(emailData);
        status ? (output['emailSent'] = true) : (output['emailSent'] = false);
        res.status(201).json(Object.assign({ success: true, message: 'Submitted successful' }, output));
    }
    catch (err) {
        logger_1.default.error(err);
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.handleSubmit = handleSubmit;
//# sourceMappingURL=submit.service.js.map