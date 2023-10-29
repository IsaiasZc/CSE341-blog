"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidationRules = exports.validatePost = exports.postValidationRules = void 0;
const { body, validationResult } = require('express-validator');
const postValidationRules = () => {
    return [
        body('title').notEmpty(),
        body('body').notEmpty(),
        body('userId').notEmpty()
    ];
};
exports.postValidationRules = postValidationRules;
const validatePost = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors
    });
};
exports.validatePost = validatePost;
const userValidationRules = () => {
    return [
        body('username').notEmpty(),
        body('email').isEmail(),
        body('password').notEmpty().isLength({ min: 6 }).custom((value) => /\d/.test(value)).withMessage('The password must containt at least one digit') // at least a number
    ];
};
exports.userValidationRules = userValidationRules;
const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(422).send({
        errors: extractedErrors
    });
};
exports.validateUser = validateUser;
exports.default = {
    postValidationRules: exports.postValidationRules,
    validatePost: exports.validatePost,
    userValidationRules: exports.userValidationRules,
    validateUser: exports.validateUser
};
//# sourceMappingURL=validator.js.map