"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../controllers/users"));
const validator_1 = require("./validator");
const router = (0, express_1.default)();
router.get('/:id', users_1.default.getUser);
router.post('/', (0, validator_1.userValidationRules)(), validator_1.validateUser, users_1.default.createUser);
router.put('/:id', users_1.default.updateUser);
module.exports = router;
//# sourceMappingURL=users.js.map