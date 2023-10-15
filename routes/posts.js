const { Router } = require('express')
const posts = require('../controllers/posts.js')

const router = Router()

router.get('/', posts.getAllPosts)

router.get('/:id', posts.getPost)

router.post('/', posts.createPost)

router.put('/:id', posts.updatePost)

router.delete('/:id', posts.deletePost)

module.exports = router
