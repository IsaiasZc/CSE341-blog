"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const postsRouter = require('./posts');
const usersRouter = require('./users');
const router = Router();
router.use('/posts', postsRouter);
router.use('/users', usersRouter);
exports.default = router;
//# sourceMappingURL=index.js.map