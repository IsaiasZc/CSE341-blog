import Router from 'express'
import users from '../controllers/users'
import { authValidationRules, userValidationRules, validateUser } from './validator'

const router = Router()

router.get('/:id', users.getUser)

router.post('/', userValidationRules(), validateUser, users.createUser)

router.put('/:id', authValidationRules, users.updateUser)

export default router