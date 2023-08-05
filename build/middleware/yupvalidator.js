"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yupValidator = (location, schema) => async (req, res, next) => {
    let _location;
    switch (location) {
        case 'query':
            _location = req.query;
            break;
        case 'body':
            _location = req.body;
            break;
        case 'params':
            _location = req.params;
            break;
    }
    try {
        await schema.validate(_location, { abortEarly: false });
        next();
    }
    catch (error) {
        let message = '';
        error.errors.forEach((e) => {
            message += `${e}. `;
        });
        next({ statusCode: 400, message: message });
    }
};
exports.default = yupValidator;
//# sourceMappingURL=yupvalidator.js.map