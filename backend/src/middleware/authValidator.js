import { check } from 'express-validator'

export const registerUserValidator = [
    check('email').exists().isString().isEmail().normalizeEmail(),
    check('password').exists().isString().isLength({ min: 5 }),
    check('password').custom(value => !/\s/.test(value)).withMessage('No spaces are allowed in the password')
]

export const loginUserValidator = [
    check('email').exists().isString().isEmail().normalizeEmail()
]