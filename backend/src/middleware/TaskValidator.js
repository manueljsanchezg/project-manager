import { check } from "express-validator"

export const createTaskValidator = [
    check('name').exists().isString().isLength({min: 1, max: 255}).trim(),
    check('priority').exists().isInt({ min: 1, max: 5 }).trim(),
    check('completed').exists().isBoolean().trim()
]

export const updateTaskValidator = [
    check('name').exists().isString().isLength({min: 1, max: 255}).trim(),
    check('priority').exists().isInt({ min: 1, max: 5 }).trim(),
    check('completed').exists().isBoolean().trim()
]