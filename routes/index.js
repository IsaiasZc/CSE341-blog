const { Router } = require('express')
const postsRouter = require('./posts.js')
const usersRouter = require('./users.js')

const router = Router()

router.use('/posts', postsRouter)
router.use('/users', usersRouter)

module.exports = router
