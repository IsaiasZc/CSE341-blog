"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("../controllers/posts"));
const validator_1 = require("./validator");
const router = (0, express_1.default)();
router.get('/', posts_1.default.getAllPosts);
router.get('/:id', posts_1.default.getPost);
router.post('/', (0, validator_1.postValidationRules)(), validator_1.validatePost, posts_1.default.createPost);
router.put('/:id', posts_1.default.updatePost);
router.delete('/:id', posts_1.default.deletePost);
module.exports = router;
//# sourceMappingURL=posts.js.map