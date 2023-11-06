import Router from 'express'
import postsRouter from './posts'
import usersRouter from './users'
import authRouter from './auth'


const router = Router()

router.use('/posts', postsRouter)
router.use('/users', usersRouter)
router.use('/auth', authRouter)

export default router
