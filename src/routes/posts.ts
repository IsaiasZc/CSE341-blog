import Router from 'express'
import posts from '../controllers/posts'
import { postValidationRules, validatePost } from './validator'

const router = Router()

router.get('/', posts.getAllPosts)

router.get('/:id', posts.getPost)

router.post('/', postValidationRules(), validatePost, posts.createPost)

router.put('/:id', posts.updatePost)

router.delete('/:id', posts.deletePost)

export default router
