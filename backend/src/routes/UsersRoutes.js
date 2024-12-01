import { Router } from 'express'
import { registerUser, loginUser} from '../controllers/authController.js'
import { loginUserValidator, registerUserValidator } from '../middleware/authValidator.js'
import { validate } from '../middleware/validator.js'

const router = Router()

// register user
router.post('/register', registerUserValidator, validate, registerUser)

// login
router.post('/login', loginUserValidator, validate, loginUser)

export default router