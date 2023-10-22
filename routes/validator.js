const { body, validationResult } = require('express-validator')

const postValidationRules = () => {
  return [
    body('title').notEmpty(),
    body('body').notEmpty(),
    body('userId').notEmpty()
  ]
}

const validatePost = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

const userValidationRules = () => {
  return [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty().isLength({ min: 6 }).custom((value) => /\d/.test(value)).withMessage('The password must containt at least one digit') // at least a number
  ]
}

const validateUser = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

module.exports = {
  postValidationRules,
  validatePost,
  userValidationRules,
  validateUser
}
