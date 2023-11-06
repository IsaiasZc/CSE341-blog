import Router from 'express'
import posts from '../controllers/posts'
import { authValidationRules, postValidationRules, validatePost } from './validator'

const router = Router()

router.get('/', posts.getAllPosts)

router.get('/:id', posts.getPost)

router.post('/',authValidationRules, postValidationRules(), validatePost, posts.createPost)

router.put('/:id', authValidationRules, posts.updatePost)

router.delete('/:id', authValidationRules, posts.deletePost)

export default router
