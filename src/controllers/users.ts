import { Request, Response } from "express"

const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email']
  },
  firstName: {
    type: String,
    required: [true, 'Please provide a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name']
  },
  date: {
    type: Date,
    default: Date.now()
  },
  image: {
    type: String
  },
  googleId: {
    type: String,
    required: true
  }
})

export const User = mongoose.model('User', UserSchema, 'users')

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.json(user)
}

const createUser = async (req: Request, res: Response) => {
  const requiredFields = ['username', 'email', 'googleId']

  const { body } = req
  const invalid = requiredFields.some(field => !body[field])

  console.log(body)

  if (invalid) {
    return res.status(400).send(new Error('Please provide username, password and email'))
  }

  const newUser = new User(body)
  await newUser.save()

  res.status(201).json({ id: newUser._id })
}

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  try {
    await User.findOneAndUpdate({ _id: id }, body, { new: true })
  } catch (err) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(204).send()
}

export default {
  getUser,
  createUser,
  updateUser
}
