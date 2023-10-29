"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const posts = require('../controllers/posts.js');
const { postValidationRules, validatePost } = require('./validator.ts');
const router = Router();
router.get('/', posts.getAllPosts);
router.get('/:id', posts.getPost);
router.post('/', postValidationRules(), validatePost, posts.createPost);
router.put('/:id', posts.updatePost);
router.delete('/:id', posts.deletePost);
module.exports = router;
//# sourceMappingURL=posts.js.map