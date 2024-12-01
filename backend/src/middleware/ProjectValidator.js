import { check } from "express-validator"

export const createProjectValidator = [
    check('name').exists().isString().isLength({min: 1, max: 255}).trim(),
    check('active').exists().isBoolean().trim(),
    check('userId').not().exists()
]

export const updateProjectValidator = [
    check('name').exists().isString().isLength({min: 1, max: 255}).trim(),
    check('userId').not().exists()
]