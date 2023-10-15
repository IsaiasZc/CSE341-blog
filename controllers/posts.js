const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  body: {
    type: String,
    required: [true, 'Please provide a body']
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const Post = mongoose.model('Post', PostSchema, 'posts')

const getAllPosts = async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts)
}

const getPost = async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.json(post)
}

const createPost = async (req, res) => {
  const requiredFields = ['title', 'body']

  const { body } = req
  const invalid = requiredFields.some(field => !body[field])

  console.log(body)

  if (invalid) {
    return res.status(400).json({ msg: 'Please provide title and body' })
  }

  const newPost = new Post(body)
  await newPost.save()

  res.status(201).json({ id: newPost._id })
}

const updatePost = async (req, res) => {
  const { id } = req.params
  const { body } = req

  try {
    await Post.findOneAndUpdate({ _id: id }, body, { new: true })
  } catch (err) {
    return res.status(404).json({ message: 'Post not found' })
  }

  return res.status(204).send()
}

const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    await Post.deleteOne({ _id: id })
  } catch (err) {
    return res.status(404).json({ message: 'Post not found' })
  }

  return res.status(200).send({ message: 'Post deleted' })
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}
