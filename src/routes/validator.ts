import { Request, Response, NextFunction } from "express"

const { body, validationResult } = require('express-validator')

export const postValidationRules = () => {
  return [
    body('title').notEmpty(),
    body('body').notEmpty(),
    body('userId').notEmpty()
  ]
}

export const validatePost = (req: Request, res: Response , next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors: { [x: number]: any }[] = []
  errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}

export const userValidationRules = () => {
  return [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').notEmpty().isLength({ min: 6 }).custom((value: string) => /\d/.test(value)).withMessage('The password must containt at least one digit') // at least a number
  ]
}

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors: { [x: number]: any }[] = []
  errors.array().map((err: any) => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).send({
    errors: extractedErrors
  })
}

export const authValidationRules = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()) {
    return next()

  }

  return res.status(401).send({
    message: 'You must be logged in to perform this action'
  })
}

export const validateLogged = (req: Request, res: Response, next: NextFunction) => {

  if (req.isAuthenticated()) {
    res.redirect('/')
  } else {
    return next()
  }

}

export default {
  postValidationRules,
  validatePost,
  userValidationRules,
  validateUser,
  authValidationRules
}
