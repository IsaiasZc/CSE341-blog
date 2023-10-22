const { Router } = require('express')
const users = require('../controllers/users.js')
const { userValidationRules, validateUser } = require('./validator.js')

const router = Router()

router.get('/:id', users.getUser)

router.post('/', userValidationRules(), validateUser, users.createUser)

router.put('/:id', users.updateUser)

module.exports = router
