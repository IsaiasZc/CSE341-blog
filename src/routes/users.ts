import Router from 'express'
import users from '../controllers/users'
import { userValidationRules, validateUser } from './validator'

const router = Router()

router.get('/:id', users.getUser)

router.post('/', userValidationRules(), validateUser, users.createUser)

router.put('/:id', users.updateUser)

module.exports = router
