const { Router } = require('express')
const postsRouter = require('./posts')
const usersRouter = require('./users')

const router = Router()

router.use('/posts', postsRouter)
router.use('/users', usersRouter)

export default router
